---
sidebar_position: 4
slug: /data-export/data-contract
---

# Data contract

This page is the authoritative reference for the files Subsets delivers to your bucket. The `_schema/SCHEMA.md` file delivered alongside the data carries the parts specific to your organization - your integrations, your enabled feeds, and ready-made `CREATE EXTERNAL TABLE` definitions for your engine; this page carries everything generic. Where the two appear to disagree, this contract is authoritative - `SCHEMA.md` is informative only, and you should never gate ingestion on parsing it.

The contract is versioned. Everything below describes `v1/`. Within `v1`, new columns may be added - but only ever appended at the **end** of the column list, never inserted mid-list and never reordered, so ordinal-bound readers (Athena's OpenCSVSerde, any skip-the-header positional reader) stay correct. A breaking change is never edited in place: it re-roots the affected feed to a `v2/` folder, delivered in parallel while you migrate.

## Layout

Files are Hive-partitioned by integration, then day:

```
subsets/                                         ← your chosen key prefix (empty = bucket root)
├─ experiment-enrollments/
│  └─ v1/
│     ├─ integration=braze-8f3c1e20-9a4b-4c7d-b1a2-0e5f6a7b8c9d/
│     │  ├─ dt=2026-07-18/
│     │  │  ├─ experiment-enrollments-2026-07-18.csv.gz
│     │  │  └─ _SUCCESS
│     │  └─ dt=2026-07-19/
│     │     ├─ experiment-enrollments-2026-07-19.csv.gz
│     │     └─ _SUCCESS
│     └─ integration=sailthru-2b7d4f61-33ac-4e90-9bd1-77c2a1f0e5aa/
│        └─ dt=2026-07-19/
│           ├─ experiment-enrollments-2026-07-19.csv.gz
│           └─ _SUCCESS
├─ audience-memberships/
│  └─ v1/
│     └─ ...same structure...
├─ subscription-risk/
│  └─ v1/
│     └─ ...same structure...
├─ _schema/
│  └─ SCHEMA.md                                  ← org-specific doc, rewritten each run
└─ _validation/
   └─ subsets-validation.txt                     ← one-time setup access proof; ignore or delete
```

| Path segment | Meaning |
| --- | --- |
| `{prefix}` | Key prefix you chose at setup, e.g. `subsets/`; empty means bucket root |
| `{feed}` | `experiment-enrollments`, `audience-memberships`, or `subscription-risk` |
| `v1` | Schema version; a breaking change re-roots to `v2/` |
| `integration=<crmtype>-<guid>` | One partition per CRM integration; the key is frozen at first delivery - renaming the integration or changing its CRM type never moves the folder |
| `dt=YYYY-MM-DD` | The snapshot's UTC capture date; one file per day, overwritten within the day |
| `{feed}-YYYY-MM-DD.csv.gz` | The data file: always gzip CSV with a header row |
| `_SUCCESS` | Zero-byte marker written last; trust a partition only when present |

Underscore-prefixed paths (`_SUCCESS`, `_schema/`, `_validation/`) are metadata, not data - partition-aware engines skip them automatically.

## File format

- **Headered CSV, always gzipped** (`.csv.gz`). The first line is the column names. A quiet day still delivers a header-only file - "no data today" stays distinct from a dead pipeline.
- **CSV dialect**: RFC 4180. Comma delimiter; `"` quoting with `""` escaping; minimal quoting (a field is quoted only when it contains a comma, quote, or leading/trailing whitespace); CRLF record terminator; UTF-8 with no BOM.
- **A field never spans lines.** CR, LF and TAB inside free-text values (experiment, audience and variant names) are collapsed to a single space, so the files are safe even for line-based readers that do not honor quoting.
- **Timestamps** are UTC ISO-8601 with a trailing `Z`, whole-second precision. **Numbers** use `.` as the decimal separator. **An empty cell means null.**

## Reading the feed correctly

1. **Trust `_SUCCESS`.** A `dt=` partition is complete only when its `_SUCCESS` marker exists. The marker is written last.
2. **Resolve "latest" by listing folders, not by scanning rows.** The current partition for an integration is its newest `dt=` folder that carries `_SUCCESS`. Do not use `max(dt)` over the data rows: on a quiet day the newest partition is header-only, so a row-based max silently returns an older day as current. Resolve per integration, never as a global max across integrations - a lagging integration must not be dropped.
3. **Sealed days.** A `dt=` partition may be rewritten during its UTC day; each rewrite is a complete replacement of the whole file (object swaps are atomic, never partial). Once the UTC day ends, the partition is immutable forever. Ingest any partition with `dt` before today (UTC) as final; if you consume intra-day, re-read today's partition on your next load.
4. **How an empty cell reads back depends on your engine.** DuckDB, Spark and BigQuery map an empty field to SQL `NULL`; Athena's OpenCSVSerde is string-only and deserializes it to the empty string `''`, not `NULL` - so on Athena `WHERE exported_at IS NULL` matches zero rows. The fully portable predicate is `WHERE exported_at IS NULL OR exported_at = ''`.

**Cadence.** Each feed snapshots after your organization's daily data import, with at most 24 hours between snapshots. The liveness signal is a new `dt=` partition (with `_SUCCESS`) arriving within that cadence.

## Feed: experiment-enrollments

One row per experiment × participant. Includes treatment, control, suppression/holdout, and already-unenrolled participants.

| Column | Contents |
| --- | --- |
| `customer_id` | The integration's `customer_crm_id` - your customer's id in that CRM |
| `experiment_id` | Experiment external id |
| `experiment_name` | Experiment name |
| `variant_name` | Variant name |
| `variant_type` | `treatment` or `control` |
| `is_suppressed` | `true` if this is a suppression variant (a group held out from treatment/communications), else `false`; matches the "Suppression variant" toggle in the Subsets UI |
| `experiment_assignment` | Stable per-variant assignment slug (`{experiment_id}-variant-N`), unique within an experiment; the same value Subsets writes to your CRM as `subsets_experiment_assignment` |
| `enrolled_at` | UTC ISO-8601 (`...Z`) |
| `unenrolled_at` | UTC ISO-8601 (`...Z`); empty = still enrolled |
| `exported_at` | UTC ISO-8601 (`...Z`) of the last successful write of this customer's assignment to your CRM; empty = it never landed there |

**Scope.** All non-draft, non-archived experiments. Stopped experiments stay in the feed - participants may still be inside their observation window. Archiving an experiment removes its rows from the next snapshot, so a drop in row count after an archive is expected, not data loss.

**Uniqueness.** (`integration`, `experiment_id`, `customer_id`) is unique within a file. Re-enrollment into the same experiment does not exist today; if such a feature ever lands it changes the grain and re-roots the feed to `v2/` - it will not silently start duplicating keys in v1.

### `exported_at` - the CRM receipt

A row in this feed is an enrollment that happened in Subsets. Writing that assignment into your CRM is a separate, retried step that can fail on the CRM side (API errors, rate limits, a customer the CRM rejects), so the feed and your CRM can disagree. `exported_at` is the receipt: the last successful write of this customer's assignment in this experiment to your CRM. Empty means no write has ever landed - expected on control and suppression rows, which are never synced by design; on a treatment row it means your CRM does not know about this enrollment.

It is a per-customer receipt, not per-subscription: two subscriptions of the same customer in one experiment carry the same `exported_at` - which is also why it can occasionally predate `enrolled_at`, when an enrollment event is newer than the push that already delivered the assignment. It records that the write succeeded, not that the CRM's value still matches this row today - someone editing the field in the CRM afterwards is invisible to Subsets.

Note that `experiment_assignment` is populated on every row in this feed, including control and suppression rows - but Subsets only writes `subsets_experiment_assignment` to your CRM for treatment participants. An equality join from this feed to that CRM column will therefore not match control rows: they exist here with no CRM counterpart.

## Feed: audience-memberships

One row per audience × customer.

| Column | Contents |
| --- | --- |
| `audience_id` | Org-facing audience id |
| `audience_name` | Audience name |
| `customer_id` | The integration's `customer_crm_id` |

**Uniqueness.** (`integration`, `audience_id`, `customer_id`) is unique within a file. The feed deduplicates: a customer with multiple subscriptions in the same audience is one row.

**Scope.** Every audience except those still awaiting Subsets approval, which are not yet visible in the app either. An audience you have hidden in the app **is** delivered - hiding only tidies your audience list, it does not withhold data.

## Feed: subscription-risk

One row per customer with at least one scored subscription.

| Column | Contents |
| --- | --- |
| `customer_id` | The integration's `customer_crm_id` |
| `churn_risk` | The highest churn probability across that customer's scored subscriptions, `0.0000`-`1.0000` (higher = more likely to churn), 4 decimals |

**Uniqueness.** (`integration`, `customer_id`) is unique within a file, so it joins 1:1 to your CRM contact.

**Semantics:**

- **The grain is the customer.** Churn is scored per subscription, but `customer_crm_id` is person-scoped in every CRM Subsets integrates, and many customers hold more than one subscription with genuinely different scores. The feed therefore aggregates to the **maximum** per customer: a contact is as at-risk as their most at-risk subscription. There is no per-subscription grain in v1 - there is no customer-facing subscription identifier to key it on; introducing one would re-root the feed to `v2/`.
- **The 0-1 range is a hard guarantee.** A stored score outside [0, 1] is clamped to the bound before the max is taken; a non-numeric stored score is treated as unscored.
- **Customers with no scored subscription are omitted entirely.** A missing row means "no score" - never a defaulted value. Do not read absence as 0 or 0.5.
- **Full-population feed.** Covers every mapped customer with a score, not just audience members or experiment participants. Expect partial coverage of your contact base: not every contact has a scored subscription.

### Why it disagrees with the `subsets_subscriber_churn_risk` CRM attribute

The CRM attribute and this feed differ by design. The attribute is scaled 0-100, is set only for experiment participants, covers just the enrolled subscription, and historically falls back to 50 when unscored. This feed is 0-1, full-population, max-per-contact, and omits the unscored. Where they disagree, this feed is authoritative.

## Lifecycle and retention

- **Integration lifecycle.** If new `dt=` partitions stop arriving for one integration, that integration was removed in Subsets or something is broken - reach out. A removed integration's folder simply stops receiving new days; there is no tombstone. A deleted-and-recreated integration is a new folder (new guid) with no link to the old one.
- **Gaps in old partitions are not data loss.** The destination bucket is yours; your own lifecycle and retention rules decide how long a `dt=` partition survives there. Subsets only ever writes objects and never deletes.
- **The Subsets archive is kept 30 days.** Subsets keeps a copy of every delivered file as evidence of what was sent, on a 30-day retention. Keep whatever history you need on your side: Subsets cannot re-deliver a partition that has aged out of the archive or that your own retention policy expired from your bucket.
- **`customer_id` is integration-scoped.** It is your customer's id in that CRM. The same person under two integrations appears in both folders under unrelated ids; nothing in the feeds links them. Analyze per integration, or join on your own identity data - naively unioning integration folders can double-count people.

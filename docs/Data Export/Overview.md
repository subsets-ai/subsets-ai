---
sidebar_position: 1
slug: /data-export
---

# Overview

Subsets can push a daily snapshot of your experimentation data into a cloud storage bucket that you own. Files land as gzipped CSV in a partitioned layout that any warehouse or query engine can read directly - Spark, Trino, Snowflake, BigQuery, Athena, Redshift Spectrum, Databricks, DuckDB, pandas.

Three feeds are available, enabled independently per organization:

| Feed | Contents | Grain |
| --- | --- | --- |
| `experiment-enrollments` | Every participant of every non-draft, non-archived experiment - treatment, control and suppression variants included | experiment × customer |
| `audience-memberships` | Every audience and every customer assigned to it | audience × customer |
| `subscription-risk` | Churn-risk score per customer, 0-1, highest across their scored subscriptions | customer |

Every row is keyed by `customer_id` - your customer's id in your CRM integration - so the files join directly onto data you already hold. See the [data contract](Data-Contract.md) for the exact layout, columns and consumption rules.

## How delivery works

- **Daily snapshots.** Each feed delivers one file per CRM integration per UTC day, a full snapshot - not a diff. The day's last run overwrites the file; a `_SUCCESS` marker signals the partition is complete.
- **Your bucket, your retention.** The destination bucket belongs to you; Subsets only ever writes objects and never deletes. Your own lifecycle rules decide how long history survives.
- **Delivery receipts.** Subsets archives a copy of every delivered file for 30 days as evidence of what was sent.
- **Self-describing.** A `_schema/SCHEMA.md` file in your bucket is rewritten on every run and documents the layout and columns for the feeds you receive.

## Setting it up

Setup is self-serve in **Settings → Data Export**:

1. Connect a bucket you own and pass a one-time validation test (Subsets writes a small proof file to confirm access).
2. Enable the feeds you want.
3. Watch per-feed delivery health from the same tab.

Supported destinations:

- **Amazon S3** - see [Connect your Amazon S3 bucket](Connect-S3.md). Access is keyless: Subsets authenticates by identity federation, so there are no access keys to exchange, store or rotate.
- **Google Cloud Storage** - available; setup documentation coming soon. Contact Subsets if you want to connect a GCS bucket today.

---
sidebar_position: 1
slug: /data-export
---

# Overview

Subsets can push a daily snapshot of your experimentation data into a cloud storage bucket that you own. Files land as gzipped CSV in a Hive-partitioned layout that any warehouse or query engine reads directly - Spark, Trino, Snowflake, BigQuery, Athena, Redshift Spectrum, Databricks, DuckDB, pandas.

Three feeds are available, enabled independently:

| Feed | Contents | Grain |
| --- | --- | --- |
| `experiment-enrollments` | Every participant of every non-draft, non-archived experiment - treatment, control and suppression variants included | experiment × customer |
| `audience-memberships` | Every audience and every customer assigned to it | audience × customer |
| `subscription-risk` | Churn-risk score per customer, 0-1, highest across their scored subscriptions | customer |

Every row is keyed by `customer_id` - your customer's id in your CRM integration - so the files join directly onto data you already hold. The [data contract](Data-Contract.md) specifies the exact layout, columns and consumption rules; a `_schema/SCHEMA.md` file delivered into your bucket documents your specific integrations and table definitions.

Each feed delivers one file per CRM integration per UTC day - a full snapshot, not a diff - with at most 24 hours between snapshots. Access is keyless in both directions: no credentials are exchanged, stored or rotated. Subsets only ever writes to your bucket and never deletes; your own lifecycle rules decide how long history survives.

## Setting it up

Setup is self-serve in **Settings → Data Export**: connect a bucket (one destination per organization), pass a one-time validation test, and enable the feeds you want. Per-feed delivery health is visible in the same tab.

- [Connect your Amazon S3 bucket](Connect-S3.md)
- [Connect your Google Cloud Storage bucket](Connect-GCS.md)

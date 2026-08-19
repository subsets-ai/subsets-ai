---
sidebar_position: 1
---

# BigQuery

Subsets supports syncing data from your BigQuery data warehouse.

## Setup guide
1. Grant the service account provided by Subsets the roles: `roles/bigquery.dataViewer` and `roles/bigquery.user` (or the permission `bigquery.jobs.create`) on the tables or dataset.
2. If you share data through [Authorized views](https://cloud.google.com/bigquery/docs/authorized-views#authorize_a_view) and the underlying tables are Partitioned, let us know the names of the partitioning columns. We can read partitioning metadata ourselves when access is granted on the tables, but not through a view.

:::note
If you are granting permissions on BigQuery Views you need to either [Authorize the views](https://cloud.google.com/bigquery/docs/authorized-views#authorize_a_view) or grant the permissions on the underlying resources. 
:::
---
sidebar_position: 1
---

# BigQuery

Subsets supports syncing data from your BigQuery data warehouse.

## Setup guide
1. Grant the service account provided by Subsets the roles: `roles/bigquery.dataViewer` and `roles/bigquery.user` on the tables or dataset.
2. If you are sharing data through Authorized views and the underlying tables are Partitioned, let us know the names of the partitioning columns.

:::note
If you are granting permissions on BigQuery Views you need to either [Authorize the views](https://cloud.google.com/bigquery/docs/authorized-views#authorize_a_view) or grant the permissions on the underlying resources. 
:::
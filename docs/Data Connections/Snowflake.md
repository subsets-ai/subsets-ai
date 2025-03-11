---
sidebar_position: 2
---

# Snowflake

Subsets supports syncing data from your Snowflake data warehouse using a [Direct Share](https://docs.snowflake.com/en/guides-overview-sharing#direct-share).

## Setup guide

1. Let us know which [Snowflake region](https://docs.snowflake.com/en/user-guide/intro-regions) you use (eg. `us-west-2`).
2. We will provide you with our snowflake account id.
3. Create the Direct Share.
4. `GRANT SELECT` on relevant tables. (if any of the tables are later recreated remeber to reapply the `GRANT SELECT`).

:::note
If any of the snowflake tables are Clustered, please share the [Clustering Keys](https://docs.snowflake.com/en/user-guide/tables-clustering-keys). 
:::

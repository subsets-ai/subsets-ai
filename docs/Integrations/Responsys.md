---
sidebar_position: 6
---

# Oracle Responsys

Subsets supports syncing data to Oracle Responsys using the [Asynchronous Merge Profile List Members API](https://docs.oracle.com/en/cloud/saas/marketing/responsys-develop/API/REST/Async/asyncApi-v1.3-lists-listName-members-post.htm) API endpoint.

The following fields will be added to members in an experiment:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk',
  'subsets_experiment_assignment'
}
```

## Setup guide
Provide the following for both your production and sandbox environments.
1. Create a new [Rest API user](https://docs.oracle.com/en/cloud/saas/marketing/responsys-develop/API/GetStarted/Authentication/auth-create-api-user.htm). Assign role 'List Web Services Manager'.
2. Share the username and password for the Rest API user in the Subsets app.
3. Share your [authentication](https://docs.oracle.com/en/cloud/saas/marketing/responsys-develop/API/GetStarted/Authentication/auth-endpoints-rest.htm) and rest urls (eg. `https://login.responsys.net`, `sandbox.piano.io`).


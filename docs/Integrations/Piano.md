---
sidebar_position: 3
---

# Piano

Subsets supports syncing data to Piano using the [Update user](https://docs.piano.io/api?endpoint=post~2F~2Fpublisher~2Fuser~2Fupdate) `/publisher/user/update` API endpoint.

The following four Custom Fields in Piano ID will be created:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide
Provide the following for both your production and sandbox environments.
1. Share the API Token from your Piano dashboard.
2. Share your base urls (eg. `api.piano.io`, `sandbox.piano.io`).


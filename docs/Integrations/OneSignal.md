---
sidebar_position: 5
---

# OneSignal

Subsets supports syncing data to OneSignal using the [Update user]([https://docs.piano.io/api?endpoint=post~2F~2Fpublisher~2Fuser~2Fupdate](https://documentation.onesignal.com/reference/update-user)) `/apps/{appId}/users/by/external_id/update` API endpoint.

The following Subsets specific tags in OneSignal will be created on each user:
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
Provide the following for both your production and staging environments.
1. Share the Application Id and API Token.
2. Share your base url (usually. `api.onesignal.com`).

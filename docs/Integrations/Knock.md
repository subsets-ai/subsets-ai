---
sidebar_position: 10
---

# Knock

Subsets supports syncing data to Knock using two APIs:
- **Data API** (`https://api.knock.app/v1/`) — [Bulk identify users](https://docs.knock.app/api-reference/users/bulk/identify) `/users/bulk/identify` for writing experiment data onto user profiles
- **Management API** (`https://control.knock.app/v1/`) — Workflow, Broadcast, and Guide endpoints for reading message/campaign details

The following custom properties are set on each user profile in Knock:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk',
  'subsets_experiment_assignment',
  'experiment_external_id'
}
```

## Campaign linking

Knock messages come in three types. When linking an experiment you select the type, enter its key, and Subsets reads the details from the matching Management API endpoint:

| Type      | Endpoint           |
| --------- | ------------------ |
| Workflow  | `workflows/{key}`  |
| Broadcast | `broadcasts/{key}` |
| Guide     | `guides/{key}`     |

## Setup guide

1. In the Knock dashboard, create a secret API key (**Settings → API keys**) for user export.
2. Create a Service Token for reading workflows, broadcasts, and guides.
3. Share both with us.

### Required credentials

| Credential    | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| API Key       | Knock secret API key — Bearer auth for the Data API (user export) |
| Service Token | Knock service token — Bearer auth for the Management API          |

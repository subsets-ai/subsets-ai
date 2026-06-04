---
sidebar_position: 6
---

# Mailchimp

Subsets supports syncing data to Mailchimp using the Marketing API [Batch operations](https://mailchimp.com/developer/marketing/api/batch-operations/start-batch-operation/) `/3.0/batches` endpoint, which wraps calls to the member tags endpoint `/lists/{list_id}/members/{subscriber_hash}/tags`.

Subsets writes experiment data to Mailchimp as **member tags** (not merge fields). Each tag encodes a `name:value` pair and is created automatically on every member:

```
{
  'subsets_experiment_id:{experiment_id}',
  'subsets_experiment_name:{experiment_name}',
  'subsets_experiment_added_at:{added_at}',
  'subsets_subscriber_churn_risk:{churn_risk}',
  'subsets_experiment_assignment:{assignment}'
}
```

Campaign linking uses the [Search campaigns](https://mailchimp.com/developer/marketing/api/search-campaigns/search-campaigns/) endpoint: you enter an email title in Subsets and pick the matching campaign(s) to link to an experiment.

:::note
The Mailchimp API only exposes regular emails. Automation Flow emails are not searchable, so their email IDs must be added manually.
:::

## Setup guide

1. Create an API key in Mailchimp (Account → Extras → API keys).
2. Share the credentials listed below.

### Required credentials

| Credential    | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| API Key       | Mailchimp Marketing API key (used as the password for Basic Auth)                                 |
| Server Prefix | Data center prefix for your account, e.g. `us16` (the suffix of your API key and dashboard URL)   |
| List ID       | Audience / list ID that experiment members belong to                                              |

---
sidebar_position: 4
---

# Braze

Subsets supports syncing data to Braze using the [Start a new import](https://api.hubapi.com/crm/v3/imports/) - `/users/track` API endpoint.

The following four User Profile Attributes can be created in Braze:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide

1. Create a REST API key for dev and prod in Braze by following [this guide](https://braze.com/docs/api/basics/#creating-rest-api-keys).
2. Add scopes listed in the [Required permissions](#req_perm).
3. Share the dev and prod REST endpoint that have been assigned your org. [See Endpoints](https://www.braze.com/docs/api/basics/#endpoints)
4. Share the API keys with us.

:::note
Calls to the endpoint will be batched, and Subsets can update 75 user profile attributes in one call, but make sure that your [API rate limits](https://www.braze.com/docs/api/api_limits/) allows for ~200 (depending on your org size) calls from Subsets per day
:::

### <a name="req_perm"></a> Required permissions
| Scopes        |
| ---           |
| `users.track` |



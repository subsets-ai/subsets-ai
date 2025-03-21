---
sidebar_position: 2
---

# Hubspot

Subsets supports syncing data to Hubspot using the [Start a new import](https://api.hubapi.com/crm/v3/imports/) - `crm/v3/imports` API endpoint.

The following four Custom Contact Properties will be created in HubSpot:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide

1. Create a Private App in Hubspot by following [this guide](https://developers.hubspot.com/docs/guides/apps/private-apps/overview#create-a-private-app).
2. Add scopes listed in the [Required permissions](#req_perm).
3. Share the Access Token with us.

:::note
Make sure that your api call rate limit allows for 5 calls from Subsets per day
:::

### <a name="req_perm"></a> Required permissions
| Scopes   |
| --- |
| `crm.objects.contacts.read`   |
| `crm.objects.custom.read`     |
| `crm.objects.custom.write`    |
| `crm.schemas.contacts.read`   |
| `crm.schemas.contacts.write`  |
| `crm.import`                  |


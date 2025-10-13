---
sidebar_position: 2
---

# HubSpot

Subsets supports syncing data to Hubspot using the [Start a new import](https://api.hubapi.com/crm/v3/imports/) - `crm/v3/imports` API endpoint.

The following four Custom Contact Properties will be created in HubSpot:
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

1. Create a Private App in Hubspot by following [this guide](https://developers.hubspot.com/docs/guides/apps/private-apps/overview#create-a-private-app).
2. Add scopes listed in the [Required permissions](#req_perm).
3. Share the Access Token with us.

:::note
Make sure that your api call rate limit allows for 5 calls from Subsets per day
:::

### <a name="req_perm"></a> Required permissions
| Scope                        |
|------------------------------|
| `crm.objects.contacts.read`  |
| `crm.objects.custom.read`    |
| `crm.objects.custom.write`   |
| `crm.schemas.contacts.read`  |
| `crm.schemas.contacts.write` |
| `crm.import`                 |
| `marketing.campaigns.read`   | 
| `marketing.campaigns.write`  | 
| `crm.lists.read`             | 
| `crm.lists.write`            | 
| `content`                    | 



## Custom contacts properties
Please add the following properties for contacts in HubSpot. 

| name                          | label                                                                  | type     | fieldType | description                                                                                                                                                        | groupName          |
|-------------------------------|------------------------------------------------------------------------|----------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| subsets_experiment_id         | Subsets Experiment Id                                                  | string   | text      | Indicates the contact is selected to participate in a Subsets retention experiment. The experiment id is provided when creating an experiment in Subsets platform. | contactinformation |
| subsets_experiment_added_at   | Subsets datetime for when the subscription was added to the experiment | datetime | date      | Indicates the date and time the contact was selected to participate in a Subsets retention experiment.                                                             | contactinformation |
| subsets_experiment_name       | Subsets experiment name.                                               | string   | text      | Subsets descriptive name of experiment.                                                                                                                            | contactinformation |
| subsets_subscriber_churn_risk | Subsets probability subscriber will churn within 30 days.              | number   | number    | Subsets probability subscriber will churn within 30 days.                                                                                                          | contactinformation |
| subsets_experiment_assignment | Subsets Experiment Treatment or Control assignment                     | string   | text      | Indicates if the subscriber is in the experiments treatment or control group.                                                                                      | contactinformation |


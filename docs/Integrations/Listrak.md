---
sidebar_position: 9
---

# Listrak

Subsets supports syncing data to Listrak using two APIs:
- **Data API** (`https://api.listrak.com/data/v1/`) - [Start a Customer Import](https://api.listrak.com/data#operation/StartCustomerImport) endpoint for bulk exporting user properties
- **Email API** (`https://api.listrak.com/email/v1`) - [Campaign](https://api.listrak.com/email#tag/Campaign) endpoint for reading campaign data

:::note
Subsets uses Listrak's bulk import endpoint, which batches multiple customers per API call for efficient syncing and reduced rate limiting impact.
:::

The following Customer Profile fields can be created in Listrak:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

### Available import fields

Subsets updates the **meta properties** (meta1-meta5) to store experiment and churn risk data. The bulk import endpoint supports the following customer fields:

| Field | Type | Constraints |
| --- | --- | --- |
| email | string | Required*, max 100 chars |
| firstName | string | max 50 chars |
| lastName | string | max 50 chars |
| address | object | Address of customer |
| birthday | date-time | Customer birthdate |
| customerNumber | string | max 20 chars |
| gender | string | max 50 chars (M/F, Male/Female) |
| homePhone | string | max 50 chars |
| mobilePhone | string | max 50 chars |
| workPhone | string | max 50 chars |
| zipCode | string | max 20 chars |
| preferredStoreNumber | string | max 100 chars |
| registered | boolean | Registration state |
| meta1-meta5 | string | max 250 chars each |
| loyalty | object | Requires active loyalty integration |
| social | object | Social data |

*Required for accounts that are not CRM enabled.

## Setup guide

1. Create API credentials in Listrak with access to the required endpoints.
2. Grant permissions listed in the [Required permissions](#req_perm) section.
3. Share the API credentials with Subsets.

### <a name="req_perm"></a> Required permissions

| API | Access Required |
| --- | --- |
| Data API - Customer | Read and write |
| Email API - Campaign | Read |

## Additional APIs

Listrak offers additional APIs for other channels. If you use any of the following, please provide Subsets with access to these as well:

- SMS API
- Cross Channel API
- Mobile App Push API
- Two Way Conversation API

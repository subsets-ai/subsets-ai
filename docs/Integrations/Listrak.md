---
sidebar_position: 9
---

# Listrak

Subsets supports syncing data to Listrak using two APIs:
- **Data API** (`https://api.listrak.com/data/v1/`) - [Customer endpoint](https://api.listrak.com/data#tag/Customer) for exporting user properties
- **Email API** (`https://api.listrak.com/email/v1`) - [Campaign endpoint](https://api.listrak.com/email#tag/Campaign) for reading campaign data

The following Customer Profile fields can be created in Listrak:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

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

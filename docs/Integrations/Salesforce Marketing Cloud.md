---
sidebar_position: 7
---

# Salesforce Marketing Cloud

Subsets supports syncing data to Salesforce Marketing Cloud (SFMC) using the Data Extensions API. This allows you to use experiment treatment assignments and customer attributes for segmentation in Automation Studio and Journey Builder.

The following fields will be created in a Data Extension:
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

1. In SFMC, go to **Setup → Apps → Installed Packages** and create a new Server-to-Server installed package.
2. Add a component to the package and enable the scopes listed in [Required permissions](#req_perm).
3. Share the credentials listed in [Required credentials](#req_creds) with us.

### <a name="req_perm"></a> Required permissions

| Scope                    |
| ------------------------ |
| `data_extensions_read`   |
| `data_extensions_write`  |
| `campaigns_read`         |
| `journeys_read`          |
| `email_read`             |

### <a name="req_creds"></a> Required credentials

| Credential               | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| Client ID                | From the installed package component                                                             |
| Client Secret            | From the installed package component                                                             |
| Authentication Base URI  | e.g. `https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com`                                       |
| REST Base URI            | e.g. `https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com`                                       |
| MID (Business Unit ID)   | Optional — provide if you'd like Subsets to operate within a specific Business Unit             |

## What Subsets does with access

- Creates and maintains a Data Extension containing your customers' experiment assignments and relevant attributes, giving your team full flexibility to use those fields in SQL queries, filters, and journey entry criteria
- Reads your campaigns, journeys, and email send definitions to surface relevant context within Subsets

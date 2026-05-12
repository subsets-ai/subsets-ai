---
sidebar_position: 7
---

# Salesforce Marketing Cloud

Subsets supports syncing data to Salesforce Marketing Cloud (SFMC) using the Data Extensions API. This allows you to use experiment treatment assignments and customer attributes for segmentation in Automation Studio and Journey Builder.

## Data Extension

Subsets writes experiment assignments to a single Data Extension. It must exist before the integration runs — either the customer's SFMC admin provisions it, or Subsets provisions it via the REST API.

### Data Extension properties

| Property               | Value                                                  |
| ---------------------- | ------------------------------------------------------ |
| Name / External Key    | `subsets`                                              |
| Description            | Subsets experiment assignment for journey and campaign segmentation |
| Is Sendable            | `true`                                                 |
| Sendable Field         | `SubscriberKey` → `_SubscriberKey`                     |
| Is Testable            | `false`                                                |
| Retention              | None (rows retained indefinitely)                      |

### Schema

| Column                  | Type | Length | Nullable | Primary Key | Description                                                              |
| ----------------------- | ---- | ------ | -------- | ----------- | ------------------------------------------------------------------------ |
| `SubscriberKey`         | Text | 100    | no       | yes         | Customer identifier (matches your SFMC contact's SubscriberKey)          |
| `experiment_id`         | Text | 100    | no       | —           | Experiment identifier                       |
| `experiment_added_at`   | Date | —      | yes      | —           | UTC timestamp when the customer was enrolled in the experiment           |
| `experiment_name`       | Text | 255    | yes      | —           | Human-readable experiment name                                           |
| `subscriber_churn_risk` | Text | 50     | yes      | —           | Probability (0–100, 4 decimals) the subscriber churns within 30 days     |
| `experiment_assignment` | Text | 100    | no       | —           | Variant assignment slug (e.g. `exp-123-variant-2`) |

A subscriber can only be in one experiment + variant at a time, so the primary key is `SubscriberKey` alone. When a subscriber moves from experiment A to experiment B, the upsert replaces the row in place.

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

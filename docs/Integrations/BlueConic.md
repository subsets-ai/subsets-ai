---
sidebar_position: 9
---

# BlueConic

Subsets supports syncing data to BlueConic using the REST API v2 bulk profile operations endpoints ([/profiles](https://rest.apidoc.blueconic.com/#put-/profiles) and [/profileProperties](https://rest.apidoc.blueconic.com/#put-/profileProperties/-profilePropertyId-))


## Setup Guide

1. **Create an OAuth 2.0 Application in BlueConic**
   - Log into your BlueConic platform as a user with "Applications" and "Authorize applications" permissions
   - Navigate to **Settings** > **Applications**
   - Click **Create Application**
   - Configure the application:
     - **Name:** Subsets Integration
     - **Description:** Integration for syncing experiment data from Subsets
     - **Grant Type:** Client Credentials (for server-to-server communication)
     - **Scopes:** Select profile read/write and profile properties read/write permissions
   - Save the application to generate your `client_id` and `client_secret`

2. **Provide Credentials to Subsets**
   - Share the client ID, client secret, and instance URL
   - Provide access to a test/sandbox environment (if available) and test profiles for validation

### Required Permissions (scopes)
| Permission Type           | Description                                    |
|---------------------------|------------------------------------------------|
| `profiles.read`           | Read access to profile data                    |
| `profiles.write`          | Write access to update profile data           |
| `profile_properties.read` | Read access to profile property definitions    |
| `profile_properties.write`| Write access to create profile properties     |

## Custom Profile Properties

Subsets creates the following custom profile properties in your BlueConic instance:

| Property Name                 | Property ID                   | Description                                    | Type   |
|-------------------------------|-------------------------------|------------------------------------------------|--------|
| subsetsExperimentId           | `subsets_experiment_id`       | Unique identifier for the experiment (external experiment id) | String |
| subsetsExperimentAddedAt      | `subsets_experiment_added_at` | Timestamp when user was added to experiment    | String |
| subsetsExperimentName         | `subsets_experiment_name`     | Name of the experiment                         | String |
| subsetsSubscriberChurnRisk    | `subsets_subscriber_churn_risk` | Probability subscriber will churn within 30 days | String |
| subsetsExperimentAssignment   | Not created via API           | Treatment or control group assignment          | String |

### Profile Property Configuration

Each profile property is configured with these settings:

| Setting | Value            | Description |
|---------|------------------|-------------|
| `availableForSegmentation` | `true`           | Available as filter to create segments |
| `canRead` | `true`           | Browser can retrieve the value |
| `canWrite` | `true`           | Browser can write new values |
| `description` | Set per property | Descriptive text for the property |
| `id` | Generated        | Unique object identifier |
| `name` | Property name    | Human-readable name |
| `precision` | `2`              | Decimal precision (default) |
| `showInUI` | `true`           | Visible in segments UI |
| `tags` | `["subsets"]`    | Tagged for organization |

Note: All properties are prefixed with `subsets` to avoid conflicts with existing profile properties in your BlueConic instance.

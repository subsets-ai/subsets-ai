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
   - Provide access to a test environment or test profiles for validation

### Required Permissions (scopes)
| Permission Type           | Description                                    |
|---------------------------|------------------------------------------------|
| `profiles.read`           | Read access to profile data                    |
| `profiles.write`          | Write access to update profile data           |
| `profile_properties.read` | Read access to profile property definitions    |
| `profile_properties.write`| Write access to create profile properties     |

## Custom Profile Properties

Subsets creates the following custom profile properties in your BlueConic instance:

| Property Name                 | Description                                    | Type   |
|-------------------------------|------------------------------------------------|--------|
| subsetsExperimentId           | Unique identifier for the experiment           | String |
| subsetsExperimentAddedAt      | Timestamp when user was added to experiment    | String |
| subsetsExperimentName         | Name of the experiment                         | String |
| subsetsSubscriberChurnRisk    | Probability subscriber will churn within 30 days | String |
| subsetsExperimentAssignment   | Treatment or control group assignment          | String |

Note: All properties are prefixed with `subsets` to avoid conflicts with existing profile properties in your BlueConic instance.

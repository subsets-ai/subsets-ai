# Iterable

Subsets supports syncing data to Iterable using the `/api/users/bulkUpdate` endpoint.

## Setup Guide

To set up the Iterable integration:

1. **Verify Custom Field Capacity**
   - Confirm that your Iterable account can accommodate 5 additional custom user profile fields
   - Subsets will create these fields automatically during setup

2. **Create an API Key in Iterable**
   - Navigate to your Iterable account settings
   - Create a new Server-side API key with user profile update permissions
   - Follow [Iterable's server-side API key documentation](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys-#server-side-keys)

3. **Provide API Key to Subsets**
   - You will get access to the Subsets platform where you can add the key

4. **Testing**
   - Provide access to a sandbox enviroment or create test users in your production enviroment.
   - This will be used to verify the integration is working correctly.

## Custom User Profile Fields

Subsets creates the following custom data fields in your Iterable user profiles:

| Field Name                    | Description                                    | Type   |
|-------------------------------|------------------------------------------------|--------|
| subsetsExperimentId           | Unique identifier for the experiment           | String |
| subsetsExperimentAddedAt      | Timestamp when user was added to experiment    | String |
| subsetsExperimentName         | Name of the experiment                         | String |
| subsetsSubscriberChurnRisk    | Subsets probability subscriber will churn within 30 days. | String |
| subsetsExperimentAssignment	  | Indicates if the subscriber is in the experiments treatment or control group. | String |

Note: All fields are prefixed with `subsets` to avoid conflicts with existing user profile fields in your Iterable account.

## Data Synchronization

- **Batch Size:** 1,000 users per API call
- **API Endpoint:** https://api.iterable.com/api/users/bulkUpdate
- **Update Method:** Merge nested objects to preserve existing user data
- **Frequency:** Based on experiment updates and schedule configured with Subsets
- **User Identification:** Uses userId to identify users in Iterable

## Implementation Notes

- Fields are automatically created by Subsets when the integration is first configured
- Updates include experiment assignments, churn risk scores, and audience information
- The integration handles batch processing to efficiently update large user sets
- All timestamps are stored in UTC format
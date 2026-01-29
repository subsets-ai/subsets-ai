---
sidebar_position: 1
---

# Sailthru

Subsets supports syncing data to Sailthru using the [Job - Update](https://getstarted.meetmarigold.com/engagebysailthru/Content/developers/api/job-update.html?tocpath=Technical%20Documents%7CFor%20Developers%7CAPI%20Endpoints%7C_____10) - `/job` API endpoint.
Subsets supports fetching blast details from  [Blast - Get](https://getstarted.meetmarigold.com/engagebysailthru/Content/developers/api/blast.html?tocpath=Technical%20Documentation%7CFor%20Developers%7CAPI%20Endpoints%7C_____3) - `/blast` API endpoint. 
This is to ensure you are linking the correct blast to the experiment. (Lifecycle Optimizer Flows are handled separately) 

The following four Custom Attributes will be created in Sailthru:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide
1. Share API key and secret for your production enviroment, and ensure they have scope access to the above endpoints. The key can be found by navigating to [Sailthru API Settings.](https://my.sailthru.com/settings/api_postbacks).

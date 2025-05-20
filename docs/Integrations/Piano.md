---
sidebar_position: 3
---

# Piano

Subsets supports syncing data to Piano using the [Update user](https://docs.piano.io/api?endpoint=post~2F~2Fpublisher~2Fuser~2Fupdate) `/publisher/user/update` API endpoint.

The following four Custom Fields in Piano ID will be created:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide
Provide the following for both your production and sandbox environments.
1. Share the API Token from your Piano dashboard.
2. Share your base urls (eg. `api.piano.io`, `sandbox.piano.io`).

## Custom contacts properties
Please add the following properties for users. 

| name                          | label                                                                  | type     | fieldType | description                                                                                                                                                        | groupName          |
|-------------------------------|------------------------------------------------------------------------|----------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| subsets_experiment_id         | Subsets Experiment Id                                                  | string   | text      | Indicates the contact is selected to participate in a Subsets retention experiment. The experiment id is provided when creating an experiment in Subsets platform. | contactinformation |
| subsets_experiment_added_at   | Subsets datetime for when the subscription was added to the experiment | datetime | date      | Indicates the date and time the contact was selected to participate in a Subsets retention experiment.                                                             | contactinformation |
| subsets_experiment_name       | Subsets experiment name.                                               | string   | text      | Subsets descriptive name of experiment.                                                                                                                            | contactinformation |
| subsets_subscriber_churn_risk | Subsets probability subscriber will churn within 30 days.              | number   | number    | Subsets probability subscriber will churn within 30 days.                                                                                                          | contactinformation |
| subsets_experiment_assignment | Subsets Experiment Treatment or Control assignment                     | string   | text      | Indicates if the subscriber is in the experiments treatment or control group.                                                                                      | contactinformation |

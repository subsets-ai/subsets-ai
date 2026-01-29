// Schema based on official Sailthru Connect Event Stream
// All fields listed are required

export const sailthruSchema = {
  campaign_sends: {
    name: "Campaign Sends",
    fields: [
      { name: "event_id", type: "STRING" },
      { name: "message_id", type: "STRING" },
      { name: "campaign_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "list_name", type: "STRING" },
      { name: "subject", type: "STRING" },
    ]
  },
  campaign_opens: {
    name: "Campaign Opens",
    fields: [
      { name: "event_id", type: "STRING" },
      { name: "message_id", type: "STRING" },
      { name: "campaign_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "list_id", type: "STRING" },
      { name: "is_real_open", type: "STRING" },
    ]
  },
  campaign_clicks: {
    name: "Campaign Clicks",
    fields: [
      { name: "event_id", type: "STRING" },
      { name: "message_id", type: "STRING" },
      { name: "campaign_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "list_id", type: "STRING" },
      { name: "is_real_click", type: "STRING" },
    ]
  },
  triggered_sends: {
    name: "Triggered Sends",
    fields: [
      { name: "message_id", type: "STRING" },
      { name: "event_id", type: "STRING" },
      { name: "template_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "flow_id", type: "STRING" },
    ]
  },
  triggered_opens: {
    name: "Triggered Opens",
    fields: [
      { name: "message_id", type: "STRING" },
      { name: "event_id", type: "STRING" },
      { name: "template_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "flow_id", type: "STRING" },
      { name: "is_real_open", type: "STRING" },
    ]
  },
  triggered_clicks: {
    name: "Triggered Clicks",
    fields: [
      { name: "message_id", type: "STRING" },
      { name: "client_id", type: "INTEGER" },
      { name: "event_id", type: "STRING" },
      { name: "template_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "signup_time", type: "TIMESTAMP" },
      { name: "flow_id", type: "STRING" },
      { name: "is_real_click", type: "STRING" },
    ]
  },
  triggered_bounces: {
    name: "Triggered Bounces",
    fields: [
      { name: "message_id", type: "STRING" },
      { name: "event_id", type: "STRING" },
      { name: "template_id", type: "STRING" },
      { name: "event_time", type: "TIMESTAMP" },
      { name: "profile_id", type: "STRING" },
      { name: "reason_log", type: "STRING" },
    ]
  },
  campaigns: {
    name: "Campaigns",
    fields: [
      { name: "campaign_id", type: "STRING" },
      { name: "client_id", type: "INTEGER" },
      { name: "template_id", type: "INTEGER" },
      { name: "name", type: "STRING" },
      { name: "from_name", type: "STRING" },
      { name: "from_email", type: "STRING" },
      { name: "replyto_email", type: "STRING" },
      { name: "subject", type: "STRING" },
      { name: "list_name", type: "STRING" },
      { name: "data_feed_url", type: "STRING" },
      { name: "preheader", type: "STRING" },
      { name: "schedule_time", type: "TIMESTAMP" },
      { name: "report_email", type: "STRING" },
      { name: "suppress_list", type: "STRING" },
      { name: "email_hour_range", type: "STRING" },
      { name: "start_time", type: "TIMESTAMP" },
      { name: "create_time", type: "TIMESTAMP" },
    ]
  },
  lifecycle_optimizer_flow: {
    name: "Lifecycle Optimizer Flow",
    fields: [
      { name: "flow_id", type: "STRING" },
      { name: "name", type: "STRING" },
      { name: "create_time", type: "TIMESTAMP" },
      { name: "modify_time", type: "TIMESTAMP" },
      { name: "version", type: "STRING" },
      { name: "client_id", type: "INTEGER" },
    ]
  },
};

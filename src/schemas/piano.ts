// Schema based on Piano subscription event stream
// Fields listed are those actually used in model processing

export const pianoSchema = {
  piano_api_subscriptions: {
    name: "Piano API Subscriptions",
    fields: [
      { name: "subscription_id", type: "STRING" },
      { name: "user_id", type: "STRING" },
      { name: "started_at", type: "TIMESTAMP" },
      { name: "billing_period", type: "STRING" },
      { name: "subscription_status", type: "STRING" },
      { name: "term_type", type: "STRING" },
      { name: "regular_price", type: "FLOAT" },
      { name: "autorenew", type: "BOOLEAN" },
      { name: "autorenew_disabled_at", type: "TIMESTAMP" },
      { name: "expiry_reason", type: "STRING" },
    ]
  },
  piano_subscriber_event_stream: {
    name: "Piano Subscriber Event Stream",
    fields: [
      { name: "subscription_id", type: "STRING" },
      { name: "user_id", type: "STRING" },
      { name: "event_timestamp", type: "TIMESTAMP" },
      { name: "subscription_action", type: "STRING" },
      { name: "event_name", type: "STRING" },
      { name: "resource_name", type: "STRING" },
      { name: "next_billed_at", type: "TIMESTAMP" },
      { name: "billing_period", type: "STRING" },
      { name: "term_type", type: "STRING" },
      { name: "term_name", type: "STRING" },
      { name: "transaction_value", type: "FLOAT" },
      { name: "trial_period_ended_at", type: "TIMESTAMP" },
      { name: "trial_duration", type: "STRING" },
      { name: "billing_country_code", type: "STRING" },
      { name: "subscription_period_number", type: "INTEGER" },
      { name: "payment_mode", type: "STRING" },
      { name: "upgrade_to_subscription_id", type: "STRING" },
      { name: "user_email_hash_sha256", type: "STRING" },
      { name: "is_internal_user", type: "BOOLEAN" },
      { name: "experience_name", type: "STRING" },
    ]
  },
};

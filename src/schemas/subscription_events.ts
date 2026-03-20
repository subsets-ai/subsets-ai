// Schema based on the standardized subscription events data contract
// See: shared/models_v2/marts/platform/_subscription_events_contract.yml

export const subscriptionEventsSchema = {
  subscription_events: {
    name: "Subscription Events",
    fields: [
      { name: "subscription_id", type: "STRING", required: true, description: "Source system subscription identifier" },
      { name: "customer_id", type: "STRING", required: true, description: "Source system customer identifier" },
      { name: "event_at", type: "TIMESTAMP", required: true, description: "When the event occurred" },
      { name: "event_type", type: "STRING", required: true, description: "Standardized event type from the accepted taxonomy" },
      { name: "event_order", type: "INT64", required: true, description: "Deterministic position of this event within the subscription's timeline" },
      { name: "plan", type: "STRING", description: "Subscription plan name at event time" },
      { name: "price", type: "FLOAT64", description: "Price at event time (monthly-normalized recommended)" },
      { name: "renewal_at", type: "TIMESTAMP", description: "Next renewal/billing date" },
      { name: "successor_subscription_id", type: "STRING", description: "The subscription_id of a new subscription that replaced or followed this one" },
    ]
  },
};

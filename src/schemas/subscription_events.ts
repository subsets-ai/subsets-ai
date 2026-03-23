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
      { name: "event_order", type: "INT64", required: "When timestamps conflict", description: "Deterministic position of this event within the subscription's timeline" },
      { name: "plan", type: "STRING", required: "On transactional events", description: "Subscription plan name at event time" },
      { name: "price", type: "FLOAT64", required: "On transactional events", description: "Price per term at event time" },
      { name: "term_length", type: "INT64", required: "On transactional events", description: "Number of term_units per billing cycle (e.g., term_length=1 + term_unit=month → monthly, term_length=13 + term_unit=week → 13-week, term_length=1 + term_unit=year → annual)" },
      { name: "term_unit", type: "STRING", required: "On transactional events", description: "Unit of the billing cycle: day, week, or month" },
      { name: "renewal_at", type: "TIMESTAMP", required: "On transactional events", description: "Next renewal/billing date" },
      { name: "successor_subscription_id", type: "STRING", required: "Only on changed.plan", description: "The subscription_id of a new subscription that replaced or followed this one" },
    ]
  },
};

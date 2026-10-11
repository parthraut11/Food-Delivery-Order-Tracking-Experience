/**
 * CLEAR — Simulated Order & Scenario Data Models
 * Product: CLEAR (Transparent tracking. Better choices.)
 * 
 * NOTE: All data herein is illustrative and simulated for demonstration purposes.
 * No real GPS, production backend, or live delivery integration is implied.
 */

window.CLEAR_DATA = {
  restaurant: {
    name: "The Green Bowl",
    tagline: "Organic Salads & Nourish Bowls",
    cuisine: "Farm-to-Table Healthy",
    orderId: "#CB78421",
    orderPlacedTime: "7:55 PM",
    currencySymbol: "₹",
    items: [
      {
        id: "item-1",
        name: "Avocado Quinoa Harvest Bowl",
        description: "Hass avocado, tri-color quinoa, roasted chickpeas, tahini drizzle",
        quantity: 1,
        price: 220
      },
      {
        id: "item-2",
        name: "Roasted Sweet Potato Salad",
        description: "Caramelized sweet potatoes, baby spinach, toasted pumpkin seeds",
        quantity: 1,
        price: 140
      },
      {
        id: "item-3",
        name: "Fresh Mint Lime Refresher",
        description: "Cold-pressed Persian lime, crushed spearmint, raw blossom honey",
        quantity: 1,
        price: 68
      }
    ],
    itemSubtotal: 428,
    deliveryFee: 0, // Complimentary delivery milestone
    taxes: 0, // Included in display price
    orderTotal: 428,
    deliveryAddress: "Apt 402, Green Glen Manor, 12th Cross, Bellandur, Bengaluru"
  },

  deliveryPartner: {
    name: "Rajesh K.",
    rating: 4.9,
    ratingCount: "1,420 deliveries",
    badge: "Eco Fleet Ambassador",
    vehicle: "Hero Electric Nyx (KA-03-EM-8821)",
    joinedYear: "2023",
    statusNoteOnTrack: "Rider is 1.2 km away, heading to the restaurant for pickup.",
    statusNoteDelayed: "Rider is waiting patiently inside the restaurant dispatch bay.",
    statusNoteUncertain: "Rider assigned and standing by for kitchen handoff signal."
  },

  scenarios: {
    on_track: {
      id: "on_track",
      name: "On Track",
      shortDescription: "Order proceeding according to initial schedule",
      statusBadgeLabel: "On schedule • Preparing",
      badgeType: "on_track",
      etaLabel: "Estimated arrival",
      etaWindow: "8:12 – 8:20 PM",
      isEtaUncertain: false,
      hasPreviousEta: false,
      previousEta: null,
      lastUpdated: "Updated 2 mins ago (8:02 PM)",
      primaryStatusMessage: "The restaurant confirmed your order and cooking is underway. Rider Rajesh is heading to the restaurant.",
      delayCardVisible: false,
      timelineProgressPercent: 40,
      currentStepIndex: 1, // 0-based: 0=Confirmed, 1=Preparing, 2=Picked up, 3=Arriving
      steps: [
        {
          id: "step-1",
          label: "Order confirmed",
          status: "completed",
          time: "7:55 PM",
          note: "Restaurant accepted order"
        },
        {
          id: "step-2",
          label: "Preparing",
          status: "current",
          time: "Est. ready ~8:08 PM",
          note: "Chef assembling harvest bowls"
        },
        {
          id: "step-3",
          label: "Picked up",
          status: "upcoming",
          time: "~8:10 PM",
          note: "Rajesh K. assigned"
        },
        {
          id: "step-4",
          label: "Arriving",
          status: "upcoming",
          time: "8:12–8:20 PM",
          note: "Direct eco-route to your door"
        }
      ]
    },

    delayed: {
      id: "delayed",
      name: "Delayed",
      shortDescription: "Preparation took 10 mins longer than expected",
      statusBadgeLabel: "Delayed by ~10 mins",
      badgeType: "delayed",
      etaLabel: "Updated arrival",
      etaWindow: "8:20 – 8:30 PM",
      isEtaUncertain: false,
      hasPreviousEta: true,
      previousEta: "8:12 – 8:20 PM",
      lastUpdated: "Updated 1 min ago (8:04 PM)",
      primaryStatusMessage: "The restaurant is taking longer than expected to prepare your order. Rider Rajesh is waiting at the kitchen counter.",
      delayCardVisible: true,
      timelineProgressPercent: 45,
      currentStepIndex: 1,
      steps: [
        {
          id: "step-1",
          label: "Order confirmed",
          status: "completed",
          time: "7:55 PM",
          note: "Restaurant accepted order"
        },
        {
          id: "step-2",
          label: "Preparing (Delayed)",
          status: "current",
          time: "Est. ready ~8:18 PM",
          note: "Kitchen packaging in progress"
        },
        {
          id: "step-3",
          label: "Picked up",
          status: "upcoming",
          time: "~8:20 PM",
          note: "Immediate handoff to Rajesh"
        },
        {
          id: "step-4",
          label: "Arriving",
          status: "upcoming",
          time: "8:20–8:30 PM",
          note: "Updated delivery window"
        }
      ],
      explanation: {
        summary: "The restaurant is taking longer than expected to prepare your order.",
        known: "The kitchen is experiencing higher dinner rush volume than predicted. Your order was started at 7:58 PM and the head chef estimated packaging by 8:16 PM.",
        changed: "The preparation phase added approximately 10 minutes to the original schedule. The kitchen confirmed packaging will finish shortly.",
        uncertain: "Transit traffic on Outer Ring Road during evening peak hours may fluctuate transit time by 2–4 minutes.",
        actions: "Rider Rajesh is already waiting at the dispatch desk for an instant pickup handoff. We will notify you immediately once transit begins."
      }
    },

    uncertain: {
      id: "uncertain",
      name: "ETA Uncertain",
      shortDescription: "Kitchen handoff timing currently being confirmed",
      statusBadgeLabel: "Confirming arrival time",
      badgeType: "uncertain",
      etaLabel: "Arrival status",
      etaWindow: "Confirming arrival time...",
      isEtaUncertain: true,
      hasPreviousEta: false,
      previousEta: null,
      lastUpdated: "Checked just now (8:05 PM)",
      primaryStatusMessage: "We’re confirming your arrival time. A reliable ETA is not currently available in this simulated scenario, so we won't guess.",
      delayCardVisible: true,
      timelineProgressPercent: 35,
      currentStepIndex: 1,
      steps: [
        {
          id: "step-1",
          label: "Order confirmed",
          status: "completed",
          time: "7:55 PM",
          note: "Restaurant accepted order"
        },
        {
          id: "step-2",
          label: "Preparing",
          status: "current",
          time: "Kitchen confirming handoff",
          note: "Awaiting packaging confirmation"
        },
        {
          id: "step-3",
          label: "Picked up",
          status: "upcoming",
          time: "Pending confirmation",
          note: "Rajesh K. standing by"
        },
        {
          id: "step-4",
          label: "Arriving",
          status: "upcoming",
          time: "Window pending",
          note: "Will compute upon kitchen release"
        }
      ],
      explanation: {
        summary: "We’re confirming your arrival time with the restaurant.",
        known: "Your order #CB78421 was accepted and cooking started at 7:55 PM. Three items are currently being freshly prepared.",
        changed: "Due to high kitchen rush and custom dressing packaging, the kitchen dispatch system has not yet locked in the exact packaging handoff time.",
        uncertain: "We do not currently have a verified timestamp from the chef. Rather than displaying an artificial guess, we are verifying directly.",
        actions: "Our automated dispatch is pinging the kitchen terminal. You will receive an accurate, verified arrival window the moment handoff is scheduled."
      }
    }
  },

  triviaQuiz: {
    question: "Which ingredient gives traditional authentic pesto its signature bright green hue and aromatic herbal fragrance?",
    options: [
      { id: "opt-a", text: "Fresh Sweet Genovese Basil", isCorrect: true },
      { id: "opt-b", text: "Baby Spinach leaves", isCorrect: false },
      { id: "opt-c", text: "Peppermint & Cilantro sprigs", isCorrect: false }
    ],
    explanation: "Authentic Genovese Pesto (Pesto alla Genovese) is traditionally made by pounding sweet Genovese basil leaves with pine nuts, garlic, Parmigiano-Reggiano, Pecorino Sardo, and extra virgin olive oil in a marble mortar.",
    pointsAward: 25 // Simulated reward only
  }
};

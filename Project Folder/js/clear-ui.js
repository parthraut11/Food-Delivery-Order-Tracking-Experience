/**
 * CLEAR — User Interface Rendering & Micro-Interactions
 * Product: CLEAR (Transparent tracking. Better choices.)
 */

(function () {
  // SVG Icon definitions (crisp, zero-dependency, semantic SVGs)
  const ICONS = {
    brandMark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    alertCircle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    radar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5"/><path d="M12 6a6 6 0 0 0-6 6c0 2.65 1.72 4.9 4.1 5.7"/><circle cx="12" cy="12" r="2"/></svg>`,
    chevronDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    helpCircle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    messageSquare: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    bell: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    shieldCheck: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    sparkles: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    saladBowl: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M8 8a3 3 0 0 1 3-3"/><path d="M14 6a2 2 0 0 1 2 2"/></svg>`,
    info: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    bike: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`
  };

  class ClearUI {
    constructor() {
      this.appContainer = document.getElementById("clear-app-root");
    }

    init() {
      window.clearState.subscribe(() => this.render());
      this.render();
      this.bindGlobalKeyboard();
    }

    showToast(message) {
      const container = document.getElementById("clear-toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = "clear-toast";
      toast.setAttribute("role", "status");
      toast.innerHTML = `
        <span>${message}</span>
        <button type="button" aria-label="Dismiss toast" style="background:none;border:none;color:#A2B5AD;cursor:pointer;padding:2px;">
          ${ICONS.close}
        </button>
      `;

      toast.querySelector("button").addEventListener("click", () => toast.remove());
      container.appendChild(toast);

      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 4200);
    }

    bindGlobalKeyboard() {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const state = window.clearState.getState();
          if (state.activeModal) {
            window.clearState.closeModal();
          }
        }
      });
    }

    render() {
      const state = window.clearState.getState();
      const scenario = window.CLEAR_DATA.scenarios[state.currentScenario];
      const data = window.CLEAR_DATA;

      if (!this.appContainer) return;

      this.appContainer.innerHTML = `
        <!-- Demonstration Scenario Selector Header -->
        ${this.renderDemoBar(state)}

        <!-- Application Sticky Navigation Header -->
        ${this.renderAppHeader()}

        <!-- Main Tracking View Container -->
        <main class="main-content" id="main-content" tabindex="-1">
          <!-- 1. The Focal Point: Prominent ETA Hero Panel -->
          ${this.renderEtaHero(scenario, state)}

          <!-- 2. Transparent Plain-Language Delay / Uncertainty Disclosure (if applicable) -->
          ${scenario.delayCardVisible ? this.renderDelayDisclosure(scenario, state) : ""}

          <!-- 3. Four-Stage Order Progress Timeline -->
          ${this.renderTimeline(scenario)}

          <!-- 4. Delivery Partner & Route Visualization -->
          ${this.renderDeliverySection(data.deliveryPartner, scenario)}

          <!-- 5. Order Summary (Secondary to ETA) -->
          ${this.renderOrderSummary(data.restaurant)}

          <!-- 6. Notifications Preference Toggle Strip -->
          ${this.renderNotificationToggle(state)}

          <!-- 7. The Waiting Room: Optional Food Trivia Bite -->
          ${this.renderWaitingRoom(data.triviaQuiz, state)}
        </main>

        <!-- Global Modals (Accessible & Dismissible) -->
        ${this.renderActiveModal(state, data)}
      `;

      this.bindEvents();
    }

    renderDemoBar(state) {
      return `
        <aside class="demo-control-bar" aria-label="Demonstration Controls">
          <div class="demo-control-inner">
            <div class="demo-control-label-group">
              <span class="demo-badge-tag">Demonstration Control</span>
              <span class="demo-control-instruction">Simulated evaluation states:</span>
            </div>
            <div class="demo-state-buttons" role="group" aria-label="Order Tracking Scenarios">
              <button type="button" class="demo-state-btn ${state.currentScenario === 'on_track' ? 'active' : ''}" data-state="on_track" aria-pressed="${state.currentScenario === 'on_track'}">
                <span class="demo-state-indicator-dot"></span>
                <span class="btn-text-full">State A: On Track</span>
                <span class="btn-text-short">On Track</span>
              </button>
              <button type="button" class="demo-state-btn ${state.currentScenario === 'delayed' ? 'active' : ''}" data-state="delayed" aria-pressed="${state.currentScenario === 'delayed'}">
                <span class="demo-state-indicator-dot"></span>
                <span class="btn-text-full">State B: Delayed</span>
                <span class="btn-text-short">Delayed</span>
              </button>
              <button type="button" class="demo-state-btn ${state.currentScenario === 'uncertain' ? 'active' : ''}" data-state="uncertain" aria-pressed="${state.currentScenario === 'uncertain'}">
                <span class="demo-state-indicator-dot"></span>
                <span class="btn-text-full">State C: ETA Uncertain</span>
                <span class="btn-text-short">Uncertain</span>
              </button>
            </div>
          </div>
        </aside>
      `;
    }

    renderAppHeader() {
      return `
        <header class="app-header">
          <div class="app-header-inner">
            <a href="#main-content" class="brand-anchor" aria-label="CLEAR Order Tracking Home">
              <div class="brand-logo-mark" aria-hidden="true">
                ${ICONS.brandMark}
              </div>
              <div class="brand-text-block">
                <span class="brand-title">CLEAR</span>
                <span class="brand-subtitle">Transparent tracking. Better choices.</span>
              </div>
            </a>
            <div class="header-actions">
              <button type="button" class="btn-header-help" id="btn-header-help" aria-label="Open support and assistance">
                ${ICONS.helpCircle}
                <span>Help</span>
              </button>
            </div>
          </div>
        </header>
      `;
    }

    renderEtaHero(scenario, state) {
      const isDelayed = scenario.badgeType === "delayed";
      const isUncertain = scenario.badgeType === "uncertain";

      let statusBadgeClass = "";
      let statusIcon = ICONS.checkCircle;
      if (isDelayed) {
        statusBadgeClass = "badge-delayed";
        statusIcon = ICONS.alertCircle;
      } else if (isUncertain) {
        statusBadgeClass = "badge-uncertain";
        statusIcon = ICONS.radar;
      }

      return `
        <section class="clear-card eta-hero-panel state-${scenario.badgeType}" aria-labelledby="eta-section-heading">
          <div class="eta-header-row">
            <span class="status-badge ${statusBadgeClass}" id="status-badge" role="status">
              ${statusIcon}
              <span>${scenario.statusBadgeLabel}</span>
            </span>
            <div class="last-updated-meta" title="Simulated update frequency">
              ${ICONS.clock}
              <span>${scenario.lastUpdated}</span>
            </div>
          </div>

          <div class="eta-display-block">
            <span class="eta-label" id="eta-section-heading">${scenario.etaLabel}</span>
            <div class="eta-time-row">
              <h1 class="eta-time-window ${isUncertain ? 'text-uncertain' : ''}" aria-live="polite">
                ${scenario.etaWindow}
              </h1>

              ${scenario.hasPreviousEta ? `
                <div class="eta-previous-pill" title="Previous estimated window before the kitchen delay">
                  <span>Previous:</span>
                  <span class="eta-previous-value">${scenario.previousEta}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <p class="eta-status-description">
            ${scenario.primaryStatusMessage}
          </p>
        </section>
      `;
    }

    renderDelayDisclosure(scenario, state) {
      if (!scenario.explanation) return "";
      const exp = scenario.explanation;
      const isExpanded = state.delayDetailsExpanded;
      const isUncertain = scenario.badgeType === "uncertain";

      return `
        <section class="delay-disclosure-card ${isUncertain ? 'uncertain-style' : ''}" aria-labelledby="delay-disclosure-heading">
          <button type="button" 
                  class="delay-toggle-trigger" 
                  id="btn-toggle-delay"
                  aria-expanded="${isExpanded}" 
                  aria-controls="delay-accordion-panel">
            <div class="delay-trigger-left">
              <span class="delay-toggle-icon" aria-hidden="true">
                ${isUncertain ? ICONS.info : ICONS.alertCircle}
              </span>
              <span id="delay-disclosure-heading">
                ${isUncertain ? 'Why is the arrival window confirming?' : 'Why the delay? Understand the details'}
              </span>
            </div>
            <span class="delay-toggle-chevron" aria-hidden="true">
              ${ICONS.chevronDown}
            </span>
          </button>

          <div class="delay-disclosure-content" 
               id="delay-accordion-panel" 
               style="display: ${isExpanded ? 'flex' : 'none'};">
            
            <p style="font-size: var(--font-size-sm); color: var(--color-text-primary); font-weight: var(--font-weight-medium); margin-top: 6px;">
              ${exp.summary}
            </p>

            <!-- 4 Structured Cognition Quadrants: What is known, What has changed, What remains uncertain, Next actions -->
            <div class="delay-quadrant-grid">
              <div class="delay-fact-item">
                <span class="fact-title fact-badge-known">
                  ${ICONS.checkCircle}
                  <span>What is known</span>
                </span>
                <p class="fact-description">${exp.known}</p>
              </div>

              <div class="delay-fact-item">
                <span class="fact-title fact-badge-changed">
                  ${ICONS.alertCircle}
                  <span>What has changed</span>
                </span>
                <p class="fact-description">${exp.changed}</p>
              </div>

              <div class="delay-fact-item">
                <span class="fact-title fact-badge-uncertain">
                  ${ICONS.radar}
                  <span>What remains uncertain</span>
                </span>
                <p class="fact-description">${exp.uncertain}</p>
              </div>

              <div class="delay-fact-item">
                <span class="fact-title fact-badge-action">
                  ${ICONS.shieldCheck}
                  <span>What you can do next</span>
                </span>
                <p class="fact-description">${exp.actions}</p>
              </div>
            </div>

            <div class="simulated-note">
              ${ICONS.info}
              <span>Simulated scenario demonstration content. Real deliveries may involve unpredictable traffic, kitchen, or weather factors.</span>
            </div>
          </div>
        </section>
      `;
    }

    renderTimeline(scenario) {
      return `
        <section class="clear-card" aria-label="Order progress timeline">
          <h2 class="timeline-section-title">Order Progress</h2>

          <div class="timeline-container" role="list">
            <div class="timeline-track-bg" aria-hidden="true">
              <div class="timeline-track-fill" style="width: ${scenario.timelineProgressPercent}%;"></div>
            </div>

            ${scenario.steps.map((step, idx) => {
              let iconContent = ICONS.clock;
              if (step.status === "completed") {
                iconContent = ICONS.checkCircle;
              } else if (step.status === "current") {
                iconContent = scenario.badgeType === "delayed" ? ICONS.alertCircle : ICONS.sparkles;
              }

              return `
                <div class="timeline-step-node ${step.status}" role="listitem">
                  <div class="step-indicator-bubble" aria-hidden="true">
                    ${iconContent}
                  </div>
                  <div class="step-text-wrapper">
                    <div class="step-header-mobile-row">
                      <span class="step-label">${step.label}</span>
                      <span class="step-time-or-status">${step.time}</span>
                    </div>
                    <span class="step-state-tag">${step.status}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </section>
      `;
    }

    renderDeliverySection(partner, scenario) {
      let partnerStatusNote = partner.statusNoteOnTrack;
      if (scenario.badgeType === "delayed") {
        partnerStatusNote = partner.statusNoteDelayed;
      } else if (scenario.badgeType === "uncertain") {
        partnerStatusNote = partner.statusNoteUncertain;
      }

      return `
        <div class="delivery-section-grid">
          <!-- Delivery Partner Profile Card -->
          <section class="clear-card partner-card-inner" aria-labelledby="partner-heading">
            <div class="partner-card-header">
              <div class="partner-meta-row">
                <div class="partner-avatar-circle" aria-label="Partner Avatar">
                  <span>RK</span>
                </div>
                <div class="partner-details-col">
                  <h3 class="partner-name" id="partner-heading">
                    <span>${partner.name}</span>
                    <span class="partner-verified-badge" title="Identity Verified & Food Safety Certified">
                      ${ICONS.shieldCheck}
                    </span>
                  </h3>
                  <div class="partner-subtext">
                    <span class="partner-rating-badge">★ ${partner.rating}</span>
                    <span>•</span>
                    <span>${partner.ratingCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <p style="font-size: var(--font-size-xs); color: var(--color-text-secondary); line-height: 1.45;">
              <strong>Current status:</strong> ${partnerStatusNote}
            </p>

            <div class="partner-actions-row">
              <button type="button" class="btn-partner-action" id="btn-call-partner" aria-label="Call delivery partner Rajesh (demo)">
                ${ICONS.phone}
                <span>Call Partner</span>
              </button>
              <button type="button" class="btn-partner-action" id="btn-message-partner" aria-label="Message delivery partner Rajesh (demo)">
                ${ICONS.messageSquare}
                <span>Message</span>
              </button>
            </div>
          </section>

          <!-- Route Schematic Card (Stylized schematic, explicit non-live indicator) -->
          <section class="clear-card route-schematic-card" aria-label="Route schematic">
            <div class="route-header-row">
              <span class="route-label-title">Delivery Route Schematic</span>
              <span class="route-static-tag">
                ${ICONS.info}
                <span>Illustrative route map</span>
              </span>
            </div>

            <!-- Crisp SVG schematic without fake live GPS -->
            <div class="route-svg-container" aria-hidden="true">
              <svg width="100%" height="48" viewBox="0 0 340 48" fill="none" style="overflow: visible;">
                <!-- Route Line -->
                <line x1="20" y1="24" x2="320" y2="24" stroke="#CBD5D0" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6"/>
                <!-- Completed Segment -->
                <line x1="20" y1="24" x2="${scenario.badgeType === 'on_track' ? '140' : '90'}" y2="24" stroke="#174D43" stroke-width="4" stroke-linecap="round"/>
                
                <!-- Restaurant Node -->
                <circle cx="20" cy="24" r="8" fill="#174D43" stroke="#FFFFFF" stroke-width="2"/>
                
                <!-- Rider Position Icon -->
                <circle cx="${scenario.badgeType === 'on_track' ? '140' : '90'}" cy="24" r="14" fill="#EEF5F0" stroke="#174D43" stroke-width="2"/>
                <g transform="translate(${scenario.badgeType === 'on_track' ? '133' : '83'}, 17)">
                  ${ICONS.bike}
                </g>

                <!-- Customer Destination Node -->
                <circle cx="320" cy="24" r="8" fill="#5C6E66" stroke="#FFFFFF" stroke-width="2"/>
              </svg>
            </div>

            <div class="route-waypoints-row">
              <div class="waypoint-item">
                <span class="waypoint-name">The Green Bowl</span>
                <span class="waypoint-sub">Kitchen Hub</span>
              </div>
              <div class="waypoint-item" style="text-align: right;">
                <span class="waypoint-name">Green Glen Manor</span>
                <span class="waypoint-sub">Drop-off Point</span>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    renderOrderSummary(restaurant) {
      return `
        <section class="clear-card order-summary-card" aria-labelledby="order-summary-heading">
          <div class="order-summary-header">
            <div class="restaurant-profile-group">
              <div class="restaurant-thumbnail-fallback" aria-hidden="true">
                ${ICONS.saladBowl}
              </div>
              <div class="restaurant-info-col">
                <h3 class="restaurant-name" id="order-summary-heading">${restaurant.name}</h3>
                <span class="order-id-meta">Order ${restaurant.orderId} • Placed ${restaurant.orderPlacedTime}</span>
              </div>
            </div>
            <div class="order-total-pill">
              <span>Total ${restaurant.currencySymbol}${restaurant.orderTotal}</span>
            </div>
          </div>

          <ul class="order-items-list" aria-label="Items ordered">
            ${restaurant.items.map(item => `
              <li class="order-item-row">
                <span class="item-qty-name">
                  <span class="item-qty">${item.quantity}×</span>
                  <span>${item.name}</span>
                </span>
                <span class="item-price">${restaurant.currencySymbol}${item.price}</span>
              </li>
            `).join("")}
          </ul>
        </section>
      `;
    }

    renderNotificationToggle(state) {
      const isChecked = state.notificationsEnabled;

      return `
        <section class="notification-toggle-card" aria-label="Notification settings">
          <div class="notification-text-col">
            <div class="notification-title">
              ${ICONS.bell}
              <span>ETA Change Alerts</span>
            </div>
            <p class="notification-desc">
              ${isChecked 
                ? 'Active (Demo mode): You will receive simulated alerts if the arrival window shifts.' 
                : 'Turn on instant notifications if your order arrival time changes.'}
            </p>
          </div>

          <button type="button" 
                  class="toggle-switch-btn" 
                  id="btn-toggle-notifications" 
                  role="switch" 
                  aria-checked="${isChecked}" 
                  aria-label="Toggle notifications for arrival time changes">
            <span class="toggle-switch-thumb"></span>
          </button>
        </section>
      `;
    }

    renderWaitingRoom(quiz, state) {
      const { selectedOptionId, isSubmitted, isCorrect, demoPointsEarned } = state.quiz;

      return `
        <section class="waiting-room-card" aria-labelledby="waiting-room-heading">
          <div class="waiting-room-header">
            <div class="waiting-room-badge">
              ${ICONS.sparkles}
              <span id="waiting-room-heading">The Waiting Room • Food Trivia</span>
            </div>
            <span class="waiting-room-points">
              ${demoPointsEarned > 0 ? `+${demoPointsEarned} pts awarded (Demo only)` : 'Optional low-pressure distraction'}
            </span>
          </div>

          <p class="quiz-question-text">
            ${quiz.question}
          </p>

          <div class="quiz-options-group" role="radiogroup" aria-label="Trivia answers">
            ${quiz.options.map(opt => {
              let stateClass = "";
              if (isSubmitted) {
                if (opt.isCorrect) stateClass = "correct";
                else if (selectedOptionId === opt.id) stateClass = "incorrect";
              } else if (selectedOptionId === opt.id) {
                stateClass = "selected";
              }

              return `
                <button type="button" 
                        class="quiz-option-btn ${stateClass}" 
                        data-option-id="${opt.id}"
                        role="radio"
                        aria-checked="${selectedOptionId === opt.id}"
                        ${isSubmitted ? 'disabled' : ''}>
                  <span>${opt.text}</span>
                  ${isSubmitted && opt.isCorrect ? `<span aria-hidden="true">${ICONS.checkCircle}</span>` : ''}
                </button>
              `;
            }).join("")}
          </div>

          ${isSubmitted ? `
            <div class="quiz-feedback-box" role="alert">
              <span class="quiz-feedback-title" style="color: ${isCorrect ? '#175428' : '#8C1D1D'};">
                ${isCorrect ? ICONS.checkCircle : ICONS.alertCircle}
                <span>${isCorrect ? 'Splendid! That is correct.' : 'Good try! Here is how it works:'}</span>
              </span>
              <p style="color: var(--color-text-secondary);">${quiz.explanation}</p>
            </div>
          ` : ''}

          <div class="quiz-actions-row">
            ${!isSubmitted ? `
              <button type="button" 
                      class="btn-submit-quiz" 
                      id="btn-submit-quiz" 
                      ${!selectedOptionId ? 'disabled' : ''}>
                Check Answer
              </button>
            ` : `
              <button type="button" 
                      class="btn-partner-action" 
                      id="btn-reset-quiz">
                Try Another Bite
              </button>
            `}
          </div>
        </section>
      `;
    }

    renderActiveModal(state, data) {
      if (!state.activeModal) return "";

      if (state.activeModal === "support") {
        return `
          <div class="modal-backdrop open" id="modal-support-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-support-title">
            <div class="modal-panel">
              <div class="modal-header">
                <h3 class="modal-title" id="modal-support-title">
                  ${ICONS.helpCircle}
                  <span>Help & Order Support</span>
                </h3>
                <button type="button" class="btn-modal-close" id="btn-close-modal" aria-label="Close modal">
                  ${ICONS.close}
                </button>
              </div>

              <div class="modal-body">
                <p>
                  We are here to help resolve any issues with your order from <strong>${data.restaurant.name}</strong> (#CB78421).
                </p>

                <div class="support-options-list">
                  <div class="support-option-card" id="opt-support-policy">
                    <div>
                      <div class="support-option-title">Delay Compensation Policy</div>
                      <div class="support-option-desc">Learn about delivery guarantees and automatic voucher credits if delays exceed 20 mins.</div>
                    </div>
                    <span>${ICONS.chevronDown}</span>
                  </div>

                  <div class="support-option-card" id="opt-support-address">
                    <div>
                      <div class="support-option-title">Update Delivery Instructions</div>
                      <div class="support-option-desc">Add apartment security gate codes, lift instructions, or no-contact drop points.</div>
                    </div>
                    <span>${ICONS.chevronDown}</span>
                  </div>

                  <div class="support-option-card" id="opt-support-cancellation">
                    <div>
                      <div class="support-option-title">Cancellation & Refund Guidelines</div>
                      <div class="support-option-desc">Review your rights to cancel if your preparation or transit is significantly delayed.</div>
                    </div>
                    <span>${ICONS.chevronDown}</span>
                  </div>
                </div>

                <div class="simulated-note">
                  ${ICONS.info}
                  <span>Demonstration support desk. No real customer service ticket is opened.</span>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-partner-action" id="btn-dismiss-support">
                  Done
                </button>
              </div>
            </div>
          </div>
        `;
      }

      if (state.activeModal === "contact_partner") {
        return `
          <div class="modal-backdrop open" id="modal-contact-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-contact-title">
            <div class="modal-panel">
              <div class="modal-header">
                <h3 class="modal-title" id="modal-contact-title">
                  ${ICONS.messageSquare}
                  <span>Contact Delivery Partner (${data.deliveryPartner.name})</span>
                </h3>
                <button type="button" class="btn-modal-close" id="btn-close-modal" aria-label="Close modal">
                  ${ICONS.close}
                </button>
              </div>

              <div class="modal-body">
                <div style="background: var(--color-surface-warm); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-main); display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--font-size-sm);">${data.deliveryPartner.name}</strong>
                    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${data.deliveryPartner.vehicle}</div>
                  </div>
                  <span class="partner-rating-badge">★ ${data.deliveryPartner.rating}</span>
                </div>

                <!-- Simulated Chat Message Feed -->
                <div id="simulated-chat-box" style="display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; padding: 4px;">
                  ${state.partnerChat.messages.map(m => `
                    <div style="align-self: ${m.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width: 80%; background: ${m.sender === 'user' ? 'var(--color-primary-green)' : 'var(--color-surface-warm)'}; color: ${m.sender === 'user' ? '#FFFFFF' : 'var(--color-text-primary)'}; padding: 8px 12px; border-radius: 8px; font-size: var(--font-size-xs);">
                      <div>${m.text}</div>
                      <div style="font-size: 0.625rem; opacity: 0.75; text-align: right; margin-top: 2px;">${m.time}</div>
                    </div>
                  `).join("")}
                </div>

                <!-- Quick Presets -->
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button type="button" class="btn-header-help btn-quick-msg" data-msg="Please leave food at security gate" style="font-size: 0.75rem; padding: 4px 8px;">
                    "Leave at security gate"
                  </button>
                  <button type="button" class="btn-header-help btn-quick-msg" data-msg="Is the order packed yet?" style="font-size: 0.75rem; padding: 4px 8px;">
                    "Is order packed yet?"
                  </button>
                </div>

                <div class="simulated-note">
                  ${ICONS.info}
                  <span>Demonstration contact interface. No real telephone or SMS network calls are transmitted.</span>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-partner-action" id="btn-dismiss-support">
                  Close
                </button>
              </div>
            </div>
          </div>
        `;
      }

      return "";
    }

    bindEvents() {
      // 1. Scenario Buttons
      document.querySelectorAll(".demo-state-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetState = btn.getAttribute("data-state");
          window.clearState.setScenario(targetState);
        });
      });

      // 2. Header Help Button
      const helpBtn = document.getElementById("btn-header-help");
      if (helpBtn) {
        helpBtn.addEventListener("click", () => window.clearState.openModal("support"));
      }

      // 3. Delay Accordion Toggle
      const delayToggleBtn = document.getElementById("btn-toggle-delay");
      if (delayToggleBtn) {
        delayToggleBtn.addEventListener("click", () => window.clearState.toggleDelayDetails());
      }

      // 4. Notifications Toggle
      const notifToggleBtn = document.getElementById("btn-toggle-notifications");
      if (notifToggleBtn) {
        notifToggleBtn.addEventListener("click", () => {
          const enabled = window.clearState.toggleNotifications();
          this.showToast(enabled ? "Demo alerts enabled for arrival updates" : "Demo alerts disabled");
        });
      }

      // 5. Delivery Partner Actions
      const callBtn = document.getElementById("btn-call-partner");
      if (callBtn) {
        callBtn.addEventListener("click", () => {
          window.clearState.openModal("contact_partner");
        });
      }
      const msgBtn = document.getElementById("btn-message-partner");
      if (msgBtn) {
        msgBtn.addEventListener("click", () => {
          window.clearState.openModal("contact_partner");
        });
      }

      // 6. Modal close actions
      const closeBtn = document.getElementById("btn-close-modal");
      if (closeBtn) closeBtn.addEventListener("click", () => window.clearState.closeModal());
      const dismissBtn = document.getElementById("btn-dismiss-support");
      if (dismissBtn) dismissBtn.addEventListener("click", () => window.clearState.closeModal());
      
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
          if (e.target === modalBackdrop) window.clearState.closeModal();
        });
      }

      // 7. Quick messages in chat modal
      document.querySelectorAll(".btn-quick-msg").forEach(btn => {
        btn.addEventListener("click", () => {
          const text = btn.getAttribute("data-msg");
          window.clearState.sendPartnerChatMessage(text);
        });
      });

      // 8. Quiz interactions
      document.querySelectorAll(".quiz-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const optId = btn.getAttribute("data-option-id");
          window.clearState.selectQuizOption(optId);
        });
      });

      const submitQuizBtn = document.getElementById("btn-submit-quiz");
      if (submitQuizBtn) {
        submitQuizBtn.addEventListener("click", () => {
          window.clearState.submitQuiz();
          const qState = window.clearState.getState().quiz;
          this.showToast(qState.isCorrect ? "Correct! +25 demo points added." : "Check the explanation below!");
        });
      }

      const resetQuizBtn = document.getElementById("btn-reset-quiz");
      if (resetQuizBtn) {
        resetQuizBtn.addEventListener("click", () => window.clearState.resetQuiz());
      }
    }
  }

  window.clearUI = new ClearUI();
})();

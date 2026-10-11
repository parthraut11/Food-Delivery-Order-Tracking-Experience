/**
 * CLEAR — Application Bootstrapper & Query Router
 * Product: CLEAR (Transparent tracking. Better choices.)
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.clearUI && window.clearState) {
    // Parse initial query params for automated testing, links, and direct state inspection
    const urlParams = new URLSearchParams(window.location.search);
    const requestedState = urlParams.get("state") || urlParams.get("scenario");
    const requestedModal = urlParams.get("modal");
    const requestedQuiz = urlParams.get("quiz");

    if (requestedState && window.CLEAR_DATA.scenarios[requestedState]) {
      window.clearState.setScenario(requestedState);
    }

    if (requestedModal) {
      if (requestedModal === "support" || requestedModal === "contact_partner") {
        window.clearState.openModal(requestedModal);
      }
    }

    if (requestedQuiz === "answered") {
      window.clearState.selectQuizOption("opt-a");
      window.clearState.submitQuiz();
    }

    const isMobileView = urlParams.get("view") === "mobile" || urlParams.get("viewport") === "390";
    if (isMobileView) {
      document.body.classList.add("mobile-viewport-preview");
    }

    window.clearUI.init();
    console.log("CLEAR Prototype initialized successfully. Ready for design evaluation.");
  }
});

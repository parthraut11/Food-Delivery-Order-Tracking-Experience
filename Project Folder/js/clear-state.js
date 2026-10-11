/**
 * CLEAR — Application State Management
 * Product: CLEAR (Transparent tracking. Better choices.)
 */

(function () {
  class ClearStateManager {
    constructor() {
      this.state = {
        currentScenario: "on_track",
        notificationsEnabled: false,
        delayDetailsExpanded: false,
        activeModal: null, // null | 'support' | 'contact_partner' | 'order_details' | 'quiz_fullscreen'
        quiz: {
          selectedOptionId: null,
          isSubmitted: false,
          isCorrect: null,
          demoPointsEarned: 0
        },
        partnerChat: {
          messages: [
            { sender: "partner", text: "Namaste! I have received your order details and I am standing by for pickup.", time: "8:00 PM" }
          ]
        }
      };

      this.listeners = [];
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      this.listeners.forEach(fn => fn(this.state));
    }

    setScenario(scenarioId) {
      if (!window.CLEAR_DATA.scenarios[scenarioId]) {
        console.warn(`Unknown scenario: ${scenarioId}`);
        return;
      }
      this.state.currentScenario = scenarioId;
      // Auto-expand delay details when entering delayed or uncertain state to assist evaluation, or keep previous preference
      if (scenarioId === "delayed" || scenarioId === "uncertain") {
        this.state.delayDetailsExpanded = true;
      } else {
        this.state.delayDetailsExpanded = false;
      }
      this.notify();
    }

    toggleDelayDetails() {
      this.state.delayDetailsExpanded = !this.state.delayDetailsExpanded;
      this.notify();
    }

    toggleNotifications() {
      this.state.notificationsEnabled = !this.state.notificationsEnabled;
      this.notify();
      return this.state.notificationsEnabled;
    }

    openModal(modalId) {
      this.state.activeModal = modalId;
      this.notify();
    }

    closeModal() {
      this.state.activeModal = null;
      this.notify();
    }

    selectQuizOption(optionId) {
      if (this.state.quiz.isSubmitted) return;
      this.state.quiz.selectedOptionId = optionId;
      this.notify();
    }

    submitQuiz() {
      if (!this.state.quiz.selectedOptionId || this.state.quiz.isSubmitted) return;
      const quizData = window.CLEAR_DATA.triviaQuiz;
      const selected = quizData.options.find(o => o.id === this.state.quiz.selectedOptionId);
      const isCorrect = selected ? !!selected.isCorrect : false;

      this.state.quiz.isSubmitted = true;
      this.state.quiz.isCorrect = isCorrect;
      if (isCorrect) {
        this.state.quiz.demoPointsEarned = quizData.pointsAward;
      }
      this.notify();
    }

    resetQuiz() {
      this.state.quiz.selectedOptionId = null;
      this.state.quiz.isSubmitted = false;
      this.state.quiz.isCorrect = null;
      this.notify();
    }

    sendPartnerChatMessage(text) {
      if (!text || !text.trim()) return;
      const now = new Date();
      const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      this.state.partnerChat.messages.push({
        sender: "user",
        text: text.trim(),
        time: timeStr
      });
      this.notify();

      // Simulated auto-reply from delivery partner after short delay
      setTimeout(() => {
        let reply = "Understood! I will ensure your instructions are followed carefully.";
        if (text.toLowerCase().includes("gate") || text.toLowerCase().includes("security")) {
          reply = "Got it! I will leave the package at the security gate and take a photo upon drop-off.";
        } else if (text.toLowerCase().includes("hot") || text.toLowerCase().includes("packed")) {
          reply = "The kitchen is packing your bowl in insulated thermo-packaging right now.";
        }
        
        this.state.partnerChat.messages.push({
          sender: "partner",
          text: reply,
          time: timeStr
        });
        this.notify();
      }, 700);
    }
  }

  window.clearState = new ClearStateManager();
})();

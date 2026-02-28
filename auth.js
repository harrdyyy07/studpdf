/**
 * Authentication Gating - Disabled by User Request
 */
const auth = {
    isLoggedIn: () => true,
    login: async () => { },
    logout: () => { },
    getUser: () => ({ name: '', email: '' }),
    init: () => {
        // No-op: Removed login button and modal injection
    },
    showModal: () => { },
    hideModal: () => { },
    gate: () => true // Always allow
};

window.auth = auth;

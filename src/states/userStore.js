const loadUser = () => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
};

let listeners = [];
let state = loadUser();

const notify = () => {
  listeners.map(listener => listener(state));
};

export const UserStore = {
  subscribe(listener) {
    listeners = [...listeners, listener];
    listener(state);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getState() {
    return state ? { ...state } : null;
  },

  setUser(userData) {
    state = userData ? { ...userData } : null;
    notify();
  },

  clear() {
    state = null;
    notify();
  },

  isLoggedIn() {
    return !!state;
  }
};

const STORAGE_KEY = 'lsa_cart';

const loadCart = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

let listeners = [];
let state = loadCart();

const notify = () => {
  listeners.map(listener => listener(state));
};

const save = (newState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
};

export const CartStore = {
  subscribe(listener) {
    listeners = [...listeners, listener];
    listener(state);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getState() {
    return [...state];
  },

  addItem(product) {
    const existing = state.find(item => item.id === product.id);
    
    if (existing) {
      state = state.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      state = [...state, { ...product, quantity: 1 }];
    }
    
    save(state);
    notify();
  },

  removeItem(productId) {
    state = state.filter(item => item.id !== productId);
    save(state);
    notify();
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) return this.removeItem(productId);
    
    state = state.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    save(state);
    notify();
  },

  clear() {
    state = [];
    save(state);
    notify();
  },

  getTotal() {
    return state.reduce((total, item) => total + (item.prix * item.quantity), 0);
  },

  getCount() {
    return state.reduce((count, item) => count + item.quantity, 0);
  }
};

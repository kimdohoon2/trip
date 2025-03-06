export const sessionStorage = {
  setItem: (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  },
};

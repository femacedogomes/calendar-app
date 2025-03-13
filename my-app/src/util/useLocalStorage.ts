function setItemInLocalStorage<T>(key: string, value: T): void {
  try {
    if (typeof window === "undefined") return; // Evita erro em SSR
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function getItemFromLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    if (typeof window === "undefined") return defaultValue ?? null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue ?? null;
  }
}

function removeItemFromLocalStorage(key: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

const localStorageUtils = {
  setItemInLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
};

export default localStorageUtils;

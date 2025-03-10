function setItemInLocalStorage<T>(key: string, value: T) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function getItemFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

const localStorageUtils = {
  setItemInLocalStorage,
  getItemFromLocalStorage,
};

export default localStorageUtils;

import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);

      if (!value) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Storage.get(${key})`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(`Storage.set(${key})`, error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage.remove(${key})`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Storage.clear()", error);
      throw error;
    }
  }

  async contains(key: string): Promise<boolean> {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  }

  async keys(): Promise<readonly string[]> {
  return await AsyncStorage.getAllKeys();
}
  async multiRemove(keys: string[]): Promise<void> {
    await AsyncStorage.multiRemove(keys);
  }
}

export default new Storage();
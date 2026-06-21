import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  async get<T>(key: string): Promise<T> {
    const data = await AsyncStorage.getItem(key);

    if (!data) {
      return [] as unknown as T;
    }

    return JSON.parse(data);
  }

  async set<T>(
    key: string,
    value: T
  ): Promise<void> {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  async remove(
    key: string
  ): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}

export default new StorageService();
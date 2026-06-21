import { STORAGE_KEYS } from "../constants";
import { getItem, setItem } from "./storage";

export interface AppSettings {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  language: string;
}

export async function getSettings(): Promise<AppSettings | null> {
  return getItem<AppSettings>(STORAGE_KEYS.SETTINGS);
}

export async function saveSettings(
  settings: AppSettings
): Promise<void> {
  await setItem(STORAGE_KEYS.SETTINGS, settings);
}
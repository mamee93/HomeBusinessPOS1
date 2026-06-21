import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme";

export type AppIconName =
  | "add"
  | "remove"
  | "close"
  | "search"
  | "edit"
  | "delete"
  | "save"
  | "back"
  | "forward"
  | "menu"
  | "home"
  | "settings"
  | "person"
  | "people"
  | "cart"
  | "receipt"
  | "category"
  | "box"
  | "barcode"
  | "camera"
  | "image"
  | "calendar"
  | "check"
  | "warning"
  | "info"
  | "star"
  | "filter"
  | "refresh"
  | "download"
  | "upload"
  | "print";

interface AppIconProps {
  name: AppIconName;

  size?: number;

  color?: string;
}

const iconMap: Record<AppIconName, keyof typeof Ionicons.glyphMap> = {
  add: "add",

  remove: "remove",

  close: "close",

  search: "search",

  edit: "create-outline",

  delete: "trash-outline",

  save: "save-outline",

  back: "arrow-back",

  forward: "arrow-forward",

  menu: "menu",

  home: "home-outline",

  settings: "settings-outline",

  person: "person-outline",

  people: "people-outline",

  cart: "cart-outline",

  receipt: "receipt-outline",

  category: "grid-outline",

  box: "cube-outline",

  barcode: "barcode-outline",

  camera: "camera-outline",

  image: "image-outline",

  calendar: "calendar-outline",

  check: "checkmark",

  warning: "warning-outline",

  info: "information-circle-outline",

  star: "star-outline",

  filter: "filter-outline",

  refresh: "refresh-outline",

  download: "download-outline",

  upload: "cloud-upload-outline",

  print: "print-outline",
};

export function AppIcon({
  name,
  size = 22,
  color = Colors.text,
}: AppIconProps) {
  return (
    <Ionicons
      name={iconMap[name]}
      size={size}
      color={color}
    />
  );
}
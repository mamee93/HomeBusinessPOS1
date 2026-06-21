import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "ابحث عن منتج...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  input: {
    height: 48,

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    paddingHorizontal: 16,

    fontSize: 16,

    color: "#111827",
  },
});
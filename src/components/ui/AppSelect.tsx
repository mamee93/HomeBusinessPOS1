import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AppInput } from "./AppInput";
import { AppText } from "./AppText";
import { SelectOption } from "./types";
import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";


interface AppSelectProps {
  label?: string;

  placeholder?: string;

  value?: string;

  options: SelectOption[];

  onChange: (value: string) => void;

  searchable?: boolean;

  disabled?: boolean;

  error?: string;

  helperText?: string;
}

export function AppSelect({
  label,
  placeholder = "اختر...",
  value,
  options,
  onChange,
  searchable = true,
  disabled = false,
  error,
  helperText,
}: AppSelectProps) {
  const [visible, setVisible] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const selected = options.find(
    (item) => item.value === value
  );

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return options;
    }

    return options.filter((item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, options]);

  return (
    <>
      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
      >
        <AppInput
          label={label}
          value={
            selected?.label ?? ""
          }
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          error={error}
          helperText={helperText}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            {searchable && (
              <AppInput
                placeholder="بحث..."
                value={search}
                onChangeText={setSearch}
              />
            )}

            <ScrollView>
              {filtered.map((item) => (
                <Pressable
                  key={item.value}
                  style={styles.item}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                    setSearch("");
                  }}
                >
                  <AppText>
                    {item.label}
                  </AppText>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              style={styles.cancel}
              onPress={() =>
                setVisible(false)
              }
            >
              <AppText
                color={Colors.danger}
                weight="700"
              >
                إلغاء
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:
      "rgba(0,0,0,0.3)",
  },

  sheet: {
    backgroundColor:
      Colors.surface,
    borderTopLeftRadius:
      Radius.xl,
    borderTopRightRadius:
      Radius.xl,
    padding: Spacing.lg,
    maxHeight: "75%",
  },

  item: {
    paddingVertical:
      Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor:
      Colors.border,
  },

  cancel: {
    alignItems: "center",
    marginTop: Spacing.lg,
  },
});
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { AppButton, AppInput, AppText } from "../ui";
import { Colors, Radius, Spacing } from "../../theme";

export interface SelectionItem {
  label: string;
  value: string;
}

interface Props {
  visible: boolean;

  title: string;

  search: string;

  onSearch: (text: string) => void;

  data: SelectionItem[];

  onSelect: (item: SelectionItem) => void;

  onClose: () => void;
}

export default function SelectionModal({
  visible,
  title,
  search,
  onSearch,
  data,
  onSelect,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <AppText
            variant="h3"
            weight="700"
          >
            {title}
          </AppText>

          <AppInput
            placeholder="بحث..."
            value={search}
            onChangeText={onSearch}
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => onSelect(item)}
              >
                <AppText>
                  {item.label}
                </AppText>
              </Pressable>
            )}
          />

          <AppButton
            title="إغلاق"
            variant="outline"
            onPress={onClose}
          />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.4)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    maxHeight: "80%",
    gap: Spacing.md,
  },

  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
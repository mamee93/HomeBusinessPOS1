import React, { ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AppText } from "./AppText";
import { AppIconButton } from "./AppIconButton";

import {
  Colors,
  Radius,
  Shadows,
 Spacing,
} from "../../theme";

interface AppModalProps {
  visible: boolean;

  title?: string;

  children: ReactNode;

  onClose: () => void;

  scrollable?: boolean;
}

export function AppModal({
  visible,
  title,
  children,
  onClose,
  scrollable = true,
}: AppModalProps) {
  const Content = scrollable ? ScrollView : View;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable
          style={styles.content}
          onPress={() => {}}
        >
          {(title || true) && (
            <View style={styles.header}
            
            
            >
              
              <AppText
                weight="700"
                style={styles.title}
              >
                {title}
              </AppText>

              <AppIconButton
                icon="close"
                onPress={onClose}
              />
            </View>
          )}

          <Content
            style={styles.body}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </Content>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },

  content: {
    width: "100%",
    maxHeight: "85%",

    backgroundColor: Colors.surface,

    borderRadius: Radius.xl,

    padding: Spacing.xl,

    ...Shadows.md,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: Spacing.lg,
  },
  title: {
    flex: 1,
  },

  body: {
    flexGrow: 0,
  },
});
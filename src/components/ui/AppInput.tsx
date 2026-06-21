import React, { forwardRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { AppText } from "./AppText";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

interface AppInputProps extends TextInputProps {
  label?: string;

  helperText?: string;

  error?: string;

  required?: boolean;

  disabled?: boolean;

  leftElement?: React.ReactNode;

  rightElement?: React.ReactNode;

  containerStyle?: StyleProp<ViewStyle>;

  inputContainerStyle?: StyleProp<ViewStyle>;
}

export const AppInput = forwardRef<
  TextInput,
  AppInputProps
>(
  (
    {
      label,
      helperText,
      error,
      required = false,

      disabled = false,

      leftElement,
      rightElement,

      containerStyle,
      inputContainerStyle,

      style,

      editable = true,

      multiline,

      ...props
    },
    ref
  ) => {
    return (
      <View style={containerStyle}>
        {label && (
          <AppText
            weight="600"
            style={styles.label}
          >
            {label}

            {required && (
              <AppText color={Colors.danger}>
                {" *"}
              </AppText>
            )}
          </AppText>
        )}

        <View
          style={[
            styles.container,

            inputContainerStyle,

            error && styles.errorBorder,

            (!editable || disabled) &&
              styles.disabledContainer,
          ]}
        >
          {leftElement}

          <TextInput
            ref={ref}
            style={[
              styles.input,

              multiline &&
                styles.multilineInput,

              style,
            ]}
            placeholderTextColor={
              Colors.textSecondary
            }
            editable={
              editable && !disabled
            }
            multiline={multiline}
            textAlignVertical={
              multiline
                ? "top"
                : "center"
            }
            {...props}
          />

          {rightElement}
        </View>

        {error ? (
          <AppText
            variant="caption"
            color={Colors.danger}
            style={styles.message}
          >
            {error}
          </AppText>
        ) : helperText ? (
          <AppText
            variant="caption"
            color={Colors.textSecondary}
            style={styles.message}
          >
            {helperText}
          </AppText>
        ) : null}
      </View>
    );
  }
);

AppInput.displayName = "AppInput";

const styles = StyleSheet.create({
  label: {
    marginBottom: Spacing.sm,
  },

  container: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.md,

    minHeight: 50,

    paddingHorizontal: Spacing.md,
  },

  input: {
    flex: 1,

    color: Colors.text,

    paddingVertical: Spacing.md,
  },

  multilineInput: {
    minHeight: 110,

    paddingTop: Spacing.md,

    textAlignVertical: "top",
  },

  errorBorder: {
    borderColor: Colors.danger,
  },

  disabledContainer: {
    backgroundColor: Colors.disabled,

    opacity: 0.7,
  },

  message: {
    marginTop: Spacing.xs,
  },
});
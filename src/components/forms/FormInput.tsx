import { FieldValues } from "react-hook-form";

import { AppInput } from "../ui";
import useFormField from "./FormField";
import { BaseTextFormFieldProps } from "./FormField.types";

type Props<T extends FieldValues> = BaseTextFormFieldProps<T>;

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  helperText,
  editable = true,
  disabled = false,
  autoCapitalize = "sentences",
  autoCorrect = false,
  secureTextEntry = false,
  keyboardType = "default",
  returnKeyType = "done",
}: Props<T>) {
  const { field, fieldState } = useFormField({
    control,
    name,
  });

  return (
    <AppInput
      label={label}
      placeholder={placeholder}
      value={field.value?.toString() ?? ""}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      editable={editable && !disabled}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      helperText={helperText}
      error={fieldState.error?.message}
    />
  );
}
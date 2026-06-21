import { FieldValues } from "react-hook-form";

import { AppInput } from "../ui";
import useFormField from "./FormField";
import { TextAreaFieldProps } from "./FormField.types";

type Props<T extends FieldValues> = TextAreaFieldProps<T>;

export default function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  helperText,
  editable = true,
  disabled = false,
  numberOfLines = 4,
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
      multiline
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      helperText={helperText}
      error={fieldState.error?.message}
    />
  );
}
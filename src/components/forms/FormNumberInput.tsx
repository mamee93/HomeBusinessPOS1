import { FieldValues } from "react-hook-form";

import { AppInput } from "../ui";
import useFormField from "./FormField";
import { NumberFieldProps } from "./FormField.types";

type Props<T extends FieldValues> = NumberFieldProps<T>;

export default function FormNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  helperText,
  editable = true,
  disabled = false,
  decimal = false,
  min,
  max,
}: Props<T>) {
  const { field, fieldState } = useFormField({
    control,
    name,
  });

  const handleChange = (text: string) => {
    if (text === "") {
      field.onChange(undefined);
      return;
    }

    let value = decimal ? parseFloat(text) : parseInt(text, 10);

    if (Number.isNaN(value)) return;

    if (min !== undefined) {
      value = Math.max(min, value);
    }

    if (max !== undefined) {
      value = Math.min(max, value);
    }

    field.onChange(value);
  };

  return (
    <AppInput
      label={label}
      placeholder={placeholder}
      value={field.value?.toString() ?? ""}
      onChangeText={handleChange}
      onBlur={field.onBlur}
      editable={editable && !disabled}
      keyboardType={decimal ? "decimal-pad" : "number-pad"}
      helperText={helperText}
      error={fieldState.error?.message}
    />
  );
}
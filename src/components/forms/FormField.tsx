import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export default function useFormField<T extends FieldValues>({
  control,
  name,
}: FormFieldProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  return {
    field,
    fieldState,
  };
}
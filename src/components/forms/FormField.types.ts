import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export interface BaseFormFieldProps<
  T extends FieldValues
> {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;

  placeholder?: string;

  helperText?: string;

  editable?: boolean;

  disabled?: boolean;
}

export interface BaseTextFormFieldProps<
  T extends FieldValues
> extends BaseFormFieldProps<T> {
  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  autoCorrect?: boolean;

  secureTextEntry?: boolean;

  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "number-pad"
    | "decimal-pad"
    | "phone-pad";

  returnKeyType?:
    | "done"
    | "next"
    | "go"
    | "search"
    | "send";
}

export interface NumberFieldProps<
  T extends FieldValues
> extends BaseFormFieldProps<T> {
  decimal?: boolean;

  min?: number;

  max?: number;
}

export interface TextAreaFieldProps<
  T extends FieldValues
> extends BaseFormFieldProps<T> {
  numberOfLines?: number;
}
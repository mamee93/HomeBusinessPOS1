import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  AppSelect,
  
} from "../ui";

import { SelectOption } from "../ui/types";
interface FormSelectProps<
  T extends FieldValues
> {
  control: Control<T>;

  name: FieldPath<T>;

  label?: string;

  placeholder?: string;

  options: SelectOption[];

  disabled?: boolean;

  helperText?: string;
}

export default function FormSelect<
  T extends FieldValues
>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled = false,
  helperText,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: false,
      }}
      render={({
        field: {
          value,
          onChange,
        },
        fieldState: {
          error,
        },
      }) => (
        <AppSelect
          label={label}
          placeholder={placeholder}
          value={value}
          options={options}
          disabled={disabled}
          helperText={helperText}
          error={error?.message}
          onChange={onChange}
        />
      )}
    />
  );
}
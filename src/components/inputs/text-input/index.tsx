import { OutlinedInput } from "@mui/material";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export interface TextInputProps {
  name: string;
  field: ControllerRenderProps<FieldValues, string>;
  type?: string;
  placeholder?: string;
  color?: string;
  variant?: "outlined" | "default" | "solid" | "standard" | "filled";
  [key: string]: any;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  field,
  type,
  placeholder,
  color,
  variant,
  ...props
}) => {
  const { value, onChange, onBlur, ref } = field;

  const isDefault = variant === "default";
  const isSolid = variant === "solid";

  return (
    <OutlinedInput
      inputRef={ref}
      {...{ name, value, onBlur, type, placeholder }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      sx={{
        ...(isDefault && {
          bgcolor: "transparent",
        }),
        ...(isSolid && { bgcolor: "common.white" }),
        ".MuiOutlinedInput-notchedOutline": {
          ...(isDefault && {
            borderColor: `${color}.main`,
          }),
        },
      }}
      {...props}
    />
  );
};

export default TextInput;

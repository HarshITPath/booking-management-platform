// import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
// import React from "react";
// import TextInput, { TextInputProps } from "./text-input";
// import { useController, ControllerRenderProps, FieldValues, UseControllerReturn } from "react-hook-form";
// // import Checkbox from "./checkbox";
// // import DatePicker from "./date-picker";
// // import AutoComplete from "./auto-complete";
// // import ReCaptcha from "./re-captcha";
// // import RadioGroup from "./radio-group";
// // import File from "./file";

// export interface InputProps {
//   name: string;
//   type?: string;
//   icon?: React.ReactNode;
//   label?: React.ReactNode;
//   placeholder?: string;
//   color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
//   variant?: "outlined" | "standard" | "filled" | "default" | "solid";
//   size?: "small" | "medium";
//   required?: boolean;
//   disabled?: boolean;
//   options?: any[];
//   removeError?: boolean;
//   [key: string]: any;
// }

// const Input: React.FC<InputProps> = ({
//   name,
//   type = "text",
//   icon,
//   label,
//   placeholder,
//   color = "primary",
//   variant = "outlined", // outlined | default | solid
//   size = "small",
//   required = false,
//   disabled = false,
//   options = [],
//   removeError,
//   ...props
// }) => {
//   const {
//     field,
//     fieldState: { error },
//   }: UseControllerReturn<FieldValues, string> = useController({
//     name,
//   });

//   const isSolid = variant === "solid";

//   const errorMessage = error?.message || "";
//   const isError = Boolean(errorMessage);

//   const isRemoveControlComponents = ["checkbox"].includes(type);

//   const renderInput = (type: string) => {
//     switch (type) {
//       // case "checkbox":
//       //   return (
//       //     <Checkbox {...{ name, field, label, size, isError }} {...props} />
//       //   );
//       // case "date-picker":
//       //   return (
//       //     <DatePicker
//       //       {...{ name, field, size, isError, placeholder }}
//       //       {...props}
//       //     />
//       //   );
//       // case "autocomplete":
//       //   return (
//       //     <AutoComplete
//       //       {...{
//       //         name,
//       //         field,
//       //         label,
//       //         size,
//       //         isError,
//       //         placeholder,
//       //         options,
//       //         disabled,
//       //       }}
//       //       {...props}
//       //     />
//       //   );
//       // case "recaptcha":
//       //   return <ReCaptcha {...{ name, field }} {...props} />;
//       // case "radio-group":
//       //   return <RadioGroup {...{ name, field, options }} {...props} />;
//       // case "file":
//       //   return <File {...{ name, field, placeholder, ...props }} {...props} />;
//       default:
//         return (
//           <TextInput
//             {...{ name, field, type, placeholder, color, variant }}
//             {...props}
//           />
//         );
//     }
//   };
//   // Only pass allowed props to FormControl
//   const muiVariant = ["outlined", "standard", "filled"].includes(variant)
//     ? (variant as "outlined" | "standard" | "filled")
//     : undefined;
//   return (
//     <FormControl
//       fullWidth
//       color={color}
//       variant={muiVariant}
//       size={size}
//       disabled={disabled}
//       error={isError}
//     >
//       {label && !isRemoveControlComponents && (
//         <Stack
//           sx={{ flexDirection: "row", alignItems: "center", gap: 0.6, mb: 1 }}
//         >
//           {icon && icon}
//           {label && !isRemoveControlComponents && (
//             <FormLabel
//               required={required}
//               sx={{
//                 ...(isSolid
//                   ? { color: "white !important" }
//                   : { color: "#1c1c1c !important" }),
//               }}
//             >
//               {label}
//             </FormLabel>
//           )}
//         </Stack>
//       )}

//       {renderInput(type)}

//       {isError && !isRemoveControlComponents && !removeError && (
//         <FormHelperText id={`${name}-helper-text`}>
//           {errorMessage}
//         </FormHelperText>
//       )}
//     </FormControl>
//   );
// };

// export default Input;


import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import React from "react";
import TextInput, { TextInputProps } from "./text-input";
import { useController, ControllerRenderProps, FieldValues, UseControllerReturn } from "react-hook-form";
import AutoComplete from "./auto-complete";
// import Checkbox from "./checkbox";
// import DatePicker from "./date-picker";
// import ReCaptcha from "./re-captcha";
// import RadioGroup from "./radio-group";
// import File from "./file";
 
export interface InputProps {
  name: string;
  type?: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  placeholder?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "outlined" | "standard" | "filled" | "default" | "solid";
  size?: "small" | "medium";
  required?: boolean;
  disabled?: boolean;
  options?: any[];
  removeError?: boolean;
  [key: string]: any;
}
 
const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  icon,
  label,
  placeholder,
  color = "primary",
  variant = "outlined", // outlined | default | solid
  size = "small",
  required = false,
  disabled = false,
  options = [],
  removeError,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  }: UseControllerReturn<FieldValues, string> = useController({
    name,
  });
 
  const isSolid = variant === "solid";
 
  const errorMessage = error?.message || "";
  const isError = Boolean(errorMessage);
 
  const isRemoveControlComponents = ["checkbox"].includes(type);
 
  const renderInput = (type: string) => {
    switch (type) {
      // case "checkbox":
      //   return (
      //     <Checkbox {...{ name, field, label, size, isError }} {...props} />
      //   );
      // case "date-picker":
      //   return (
      //     <DatePicker
      //       {...{ name, field, size, isError, placeholder }}
      //       {...props}
      //     />
      //   );
      case "autocomplete":
        return (
          <AutoComplete
            {...{
              name,
              field,
              size,
              isError,
              placeholder,
              options,
              disabled,
            }}
            {...props}
          />
        );
      // case "recaptcha":
      //   return <ReCaptcha {...{ name, field }} {...props} />;
      // case "radio-group":
      //   return <RadioGroup {...{ name, field, options }} {...props} />;
      // case "file":
      //   return <File {...{ name, field, placeholder, ...props }} {...props} />;
      default:
        return (
          <TextInput
            {...{ name, field, type, placeholder, color, variant }}
            {...props}
          />
        );
    }
  };
  // Only pass allowed props to FormControl
  const muiVariant = ["outlined", "standard", "filled"].includes(variant)
    ? (variant as "outlined" | "standard" | "filled")
    : undefined;
  return (
    <FormControl
      fullWidth
      color={color}
      variant={muiVariant}
      size={size}
      disabled={disabled}
      error={isError}
    >
      {label && !isRemoveControlComponents && (
        <Stack
          sx={{ flexDirection: "row", alignItems: "center", gap: 0.6, mb: 1 }}
        >
          {icon && icon}
          {label && !isRemoveControlComponents && (
            <FormLabel
              required={required}
              sx={{
                ...(isSolid
                  ? { color: "white !important" }
                  : { color: "#1c1c1c !important" }),
              }}
            >
              {label}
            </FormLabel>
          )}
        </Stack>
      )}
 
      {renderInput(type)}
 
      {isError && !isRemoveControlComponents && !removeError && (
        <FormHelperText id={`${name}-helper-text`}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
 
export default Input;
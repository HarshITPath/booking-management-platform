import {
  Autocomplete as MuiAutocomplete,
  TextField,
  AutocompleteProps,
} from "@mui/material";
import React from "react";
 
interface Option {
  id: string | number;
  label: string;
  [key: string]: any; // for additional properties
}
 
interface AutoCompleteProps {
  name?: string;
  size?: "small" | "medium";
  options?: Option[];
  multiple?: boolean;
  disableCloseOnSelect?: boolean;
  isError?: boolean;
  placeholder?: string;
  optionDisabled?: (option: Option) => boolean;
  isSearchable?: boolean;
  field: {
    value: Option | Option[] | null;
    onChange: (value: Option | Option[] | null) => void;
    onBlur?: () => void;
    ref?: React.Ref<any>;
  };
}
 
const AutoComplete: React.FC<
  AutoCompleteProps &
    Partial<AutocompleteProps<Option, boolean, boolean, boolean>>
> = ({
  name,
  size = "medium",
  options = [],
  multiple = false,
  disableCloseOnSelect = false,
  isError,
  placeholder,
  optionDisabled = () => false,
  isSearchable = false,
  field,
  ...props
}) => {
  const { value, onChange, onBlur, ref } = field;
 
  const formattedValue = React.useMemo(() => {
    if (!value) return multiple ? [] : null;
    return multiple && !Array.isArray(value) ? [value] : value;
  }, [value, multiple]);
 
  const handleChange = (
    _: React.SyntheticEvent,
    newValue: Option | Option[] | null | string | (string | Option)[]
  ) => {
    if (isSearchable) {
      // Handle string input case
      if (typeof newValue === "string") {
        onChange({ id: newValue, label: newValue });
      } else if (Array.isArray(newValue)) {
        // Handle array case where items might be strings or Options
        const processedValue = newValue.map((item) =>
          typeof item === "string" ? { id: item, label: item } : item
        );
        onChange(processedValue as Option[]);
      } else if (newValue === null) {
        onChange(null);
      } else {
        // Handle single Option case
        onChange(newValue as Option);
      }
    } else {
      // Non-searchable case - just pass through
      onChange(newValue as Option | Option[] | null);
    }
  };
 
  return (
    <MuiAutocomplete<Option, boolean, boolean, boolean>
      {...{ name, multiple, disableCloseOnSelect }}
      size={size}
      value={formattedValue}
      options={options}
      onChange={handleChange}
      getOptionDisabled={optionDisabled}
      isOptionEqualToValue={(option, value) => {
        if (!value) return false;
        const val = typeof value === "string" ? value : value.id;
        return option.id === val;
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        return option?.label || "";
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={placeholder}
            inputRef={ref}
            error={isError}
            onBlur={onBlur}
            {...(isSearchable && {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                onChange({ id: value, label: value });
              },
            })}
          />
        );
      }}
      slotProps={{
        listbox: {
          sx: { fontSize: "16px" },
        },
        paper: {
          sx: {
            fontSize: "16px",
            "& .MuiAutocomplete-noOptions": {
              fontSize: "16px",
            },
          },
        },
        popupIndicator: {
          sx: { color: "#1c1c1c" },
        },
      }}
      {...props}
      sx={{
        py: "0px !important",
        ".MuiInputBase-root": {
          py: "0px !important",
          input: {
            py: "0px !important",
            height: "40px",
          },
        },
        ...props.sx,
      }}
    />
  );
};
 
export default AutoComplete
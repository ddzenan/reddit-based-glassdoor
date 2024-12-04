"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

/**
 * Represents an option for a select input.
 *
 * @property {string} key - The unique key for the option.
 * @property {string} value - The value to be displayed for the option.
 */
type Option = { key: string; value: string };

/**
 * Props for the `FormFieldWrapper` component.
 *
 * @property {string} name - The name of the form field.
 * @property {Control<any>} control - The control object from `react-hook-form` for managing the form state.
 * @property {string} [label] - The optional label for the form field.
 * @property {string} [placeholder] - The optional placeholder text for the input field.
 * @property {("text" | "number" | "select")} [type="text"] - The type of the form field. It can be "text", "number", or "select".
 * @property {Option[]} [options] - The options for the select input, required only if the type is "select".
 * @property {(value: any, nativeOnChange?: (value: any) => void) => void} [onChange] - The optional change handler for the field value.
 */
type FormFieldWrapperProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "select";
  options?: Option[];
  onChange?: (value: any, nativeOnChange?: (value: any) => void) => void;
};

/**
 * A React component that wraps a form field, rendering either an input field or a select dropdown.
 * It supports various field types (text, number, select) and provides flexible handling of changes
 * with optional custom behavior for field value changes.
 *
 * @param {FormFieldWrapperProps} props - The properties for the component, including the field name, control object, label, placeholder, and type.
 * @returns A JSX element that renders the appropriate form field, with support for handling changes and displaying validation messages.
 */
export default function FormFieldWrapper({
  name,
  control,
  label,
  placeholder,
  type = "text",
  options = [],
  onChange,
}: FormFieldWrapperProps) {
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    nativeOnChange: (value: any) => void
  ) {
    if (onChange) {
      onChange(e, nativeOnChange);
    } else {
      nativeOnChange(e);
    }
  }

  function handleSelectChange(
    value: string,
    fieldValue: string | null,
    nativeOnChange: (value: any) => void
  ) {
    if (value !== fieldValue && (value !== "" || fieldValue !== null)) {
      nativeOnChange(value);
      onChange?.(value, nativeOnChange);
    }
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type === "text" || type === "number" ? (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                value={field.value ?? ""}
                onChange={(e) => handleInputChange(e, field.onChange)}
              />
            ) : (
              <Select
                {...field}
                onValueChange={(value) =>
                  handleSelectChange(value, field.value, field.onChange)
                }
                value={field.value ?? ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder ?? "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(({ key, value }) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

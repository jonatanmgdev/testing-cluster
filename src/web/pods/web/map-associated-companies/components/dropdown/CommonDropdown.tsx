"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DropdownOption } from "./interfaces/DropdownOption";
import { Control, Controller } from "react-hook-form";

type BaseSelectAttributes = React.ComponentPropsWithoutRef<"select">;

interface CommonDropdownProps extends BaseSelectAttributes {
  id: string;
  options: DropdownOption[];
  onSelectOption?: (option: DropdownOption) => void;
  control?: Control<any, any>;
  onClear?: () => void;
  className?: string;
  selectClassName?: string;
  CommonDropdownVariant?: keyof typeof CommonDropdownStyles;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Renders a common dropdown component with specified options and behavior.
 *
 * @param {string} id - The unique identifier for the dropdown.
 * @param {Control<any, any>} control - The control object for the dropdown.
 * @param {DropdownOption[]} options - The list of options available in the dropdown.
 * @param {(option: DropdownOption) => void} onSelectOption - The function to handle option selection.
 * @param {() => void} onClear - The function to clear the dropdown selection.
 * @param {string} value - The current selected value in the dropdown.
 * @param {string} placeholder - The placeholder text for the dropdown.
 * @param {string} className - The CSS class name for styling the dropdown.
 * @param {string} selectClassName - The CSS class name for styling the select element.
 * @param {string} CommonDropdownVariant - The style type for the dropdown.
 * @param {boolean} disabled - Flag indicating if the dropdown is disabled.
 * @param {boolean} required - Flag indicating if the dropdown is required.
 * @return {JSX.Element} The rendered common dropdown component.
 */

enum CommonDropdownStyles {
  DEFAULT = "border border-neutral-medium text-gray-900 rounded-lg appearance-none px-8 truncate",
  ROUNDED = "border-2 border-neutral-medium text-gray-900 rounded-full appearance-none pl-4 pr-8 truncate",
}

const CommonDropdown = ({
  id,
  control,
  options,
  onSelectOption,
  onClear,
  value,
  placeholder,
  className,
  selectClassName = "",
  CommonDropdownVariant,
  disabled = false,
  required = false,
  ...rest
}: CommonDropdownProps) => {
  const [CommonDropdownStyle, setCommonDropdownStyle] = useState(CommonDropdownStyles.DEFAULT);

  useEffect(() => {
    if (CommonDropdownVariant) {
      setCommonDropdownStyle(CommonDropdownStyles[CommonDropdownVariant]);
    }
  }, [CommonDropdownVariant]);

  return (
    <div className={`${className}`}>
      {control ? (
        <Controller
          name={id}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...rest}
              {...field}
              {...{
                required: required,
                setValueAs: (value: any) => (value === "" ? undefined : value),
              }}
              disabled={disabled}
              id={id}
              value={field.value.value || field.value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedOption: DropdownOption | undefined = options.find(
                  (option: DropdownOption) => option.value === e.target.value
                );
                if (selectedOption) {
                  onSelectOption && onSelectOption(selectedOption);
                  control && field.onChange(selectedOption);
                }
              }}
              className={`${CommonDropdownStyle} ${selectClassName}  ${
                disabled ? "pointer-events-none bg-neutral-light" : ""
              }`}
              style={{
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'none\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5rem',
              }}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option: DropdownOption, index: number) => (
                <option
                  key={index}
                  className={"hover:bg-neutral-light transition delay-100"}
                  value={option.value}
                >
                  {option.value}
                </option>
              ))}
            </select>
          )}
        ></Controller>
      ) : (
        <select
          {...rest}
          disabled={disabled}
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const selectedOption: DropdownOption | undefined = options.find(
              (option: DropdownOption) => option.value === e.target.value
            );
            if (selectedOption) {
              onSelectOption && onSelectOption(selectedOption);
            }
          }}
          className={`${CommonDropdownStyle} ${selectClassName} ${
            disabled ? "pointer-events-none bg-neutral-light" : ""
          }`}
          style={{
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'none\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5rem',
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option: DropdownOption, index: number) => (
            <option
              key={index}
              className={"hover:bg-neutral-light transition delay-100"}
              value={option.value}
            >
              {option.value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CommonDropdown;

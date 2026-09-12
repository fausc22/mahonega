"use client";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
const options = [
  { value: "productos", label: "Productos y disponibilidad" },
  { value: "asesoramiento", label: "Asesoramiento veterinario" },
  { value: "entregas", label: "Entregas y cobertura" },
  { value: "otra", label: "Otra consulta" },
];
export function FormSelect({
  defaultValue,
  disabled,
  error,
}: {
  defaultValue: string;
  disabled: boolean;
  error?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      <input type="hidden" name="intent" value={value} />
      <Select.Root value={value} onValueChange={setValue} disabled={disabled}>
        <Select.Trigger
          id="intent"
          className="form-select-trigger"
          aria-labelledby="intent-label"
          aria-invalid={!!error}
          aria-describedby={error ? "intent-error" : undefined}
        >
          <span>{options.find((option) => option.value === value)?.label}</span>
          <Select.Icon asChild>
            <ChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="form-select-content"
            position="popper"
            sideOffset={6}
            collisionPadding={16}
          >
            <Select.ScrollUpButton className="form-select-scroll">
              <ChevronUp size={17} />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  className="form-select-option"
                  key={option.value}
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={17} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="form-select-scroll">
              <ChevronDown size={17} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

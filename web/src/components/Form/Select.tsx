import * as RadixSelect from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check } from 'phosphor-react';

interface Option {
  value: string;
  label?: string;
}

interface SelectProps extends RadixSelect.SelectProps {
  title: string;
  placeholder?: string;
  options: Option[];
}

export function Select({ title, placeholder, options, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger asChild aria-label={title}>
        <button className="flex gap-2 justify-between items-center py-3 px-4 rounded bg-zinc-900">
          <RadixSelect.Value
            placeholder={<span className="text-zinc-500">{placeholder}</span>}
          />

          <RadixSelect.Icon>
            <CaretDown />
          </RadixSelect.Icon>
        </button>
      </RadixSelect.Trigger>

      <RadixSelect.Content className="bg-zinc-600 rounded-lg mt-3 mr-9 -translate-x-[14.95rem]">
        <RadixSelect.ScrollUpButton className="flex items-center justify-center text-gray-300 py-1">
          <CaretUp />
        </RadixSelect.ScrollUpButton>

        <RadixSelect.Viewport className="p-2 rounded-lg shadow-lg">
            {options.map(
              ({ value, label }) => (
                <RadixSelect.Item
                  key={value}
                  value={value}
                  className="relative cursor-pointer flex items-center px-8 py-2 rounded-md text-sm text-white font-medium focus:bg-zinc-800 radix-disabled:opacity-50 focus:outline-none Radixselect-none"
                >
                  <RadixSelect.ItemText>
                    {label || value}
                  </RadixSelect.ItemText>

                  <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              )
            )}
        </RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton className="flex items-center justify-center text-gray-300 py-1">
          <CaretDown />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Root>
  )
}
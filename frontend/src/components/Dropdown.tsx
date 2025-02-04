// import { Select } from "@headlessui/react";
import Select, { MultiValue } from 'react-select';
import { FC, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface DropDownProps {
  data: { id: number, name: string }[]
  onChange: (keys: string[]) => void;
  // selected: number[]
}

const DropDown: FC<DropDownProps> = ({ data, onChange }) => {
  const [selected, setSelected] = useState<SelectOption[]>([]);

  const updatedSelected = (options: MultiValue<SelectOption>) => {

    setSelected([...options])
    onChange(options.map(op => op.value))

  }
  return (
    <>
      <label
        htmlFor="category_dropdown"
        className="block text-[var(--color-muted-text)]"
      >
        Category
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        value={selected}
        // className="w-full py-2 h-10.5 border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        options={data.map(d => {
          return { value: d.id.toString(), label: d.name }
        })}
        onChange={(e) => updatedSelected(e)}
      >


      </Select>
    </>
  );
}

export default DropDown;
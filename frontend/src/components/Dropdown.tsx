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

// TODO remove react-select and make a customized multi-select using headless and tailwind.

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
        className="block text-text-muted"
      >
        Category
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        value={selected}
        styles={{
          valueContainer: (base) => ({
            ...base,
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            flexWrap: "nowrap"
          }),
        }}
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
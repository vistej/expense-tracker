import { FC } from "react";
import DatePicker from "react-tailwindcss-datepicker";
import { Filter } from "../models/expense.model";
interface DateRangeProps {
  filter: Filter,
  updateFilter: (filter: Filter) => void
}

const DateRange: FC<DateRangeProps> = ({ filter, updateFilter }) => {

  return (<>
    <div>
      <label
        htmlFor="start_date"
        className="block text-text-muted"
      >
        Date Range
      </label>
      <DatePicker
        separator="-"
        readOnly={true}
        inputClassName="p-1.5 w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        value={{ startDate: filter.start_date, endDate: filter.end_date }}
        onChange={(date) => {
          if (date && date.startDate && date.endDate) {
            const nf: Filter = { ...filter, start_date: date.startDate, end_date: date.endDate }
            updateFilter(nf)
          }
        }
        }
      />
    </div>


  </>);
}

export default DateRange;
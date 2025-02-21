import { FC } from "react";
import DatePicker from "react-datepicker";
import { Filter } from "../models/expense.model";
interface DateRangeProps {
  filter: Filter,
  updateFilter: (filter: Filter) => void
}

const DateRange: FC<DateRangeProps> = ({ filter, updateFilter }) => {

  return (<div className="flex flex-col md:flex-row">
    <div>
      <label
        htmlFor="start_date"
        className="block text-text-muted"
      >
        Start Date
      </label>
      <DatePicker
        wrapperClassName=""
        className="p-1.5 w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        selectsStart
        selected={filter.start_date}
        onChange={(date) => {
          if (date) {
            const nf: Filter = { ...filter, start_date: date }
            if (nf.end_date < date) {
              nf.end_date = date
            }
            updateFilter(nf)
          }
        }}
        startDate={filter.start_date}
        endDate={filter.end_date}
      />
    </div>
    <div>
      <label
        htmlFor="end_date"
        className="block text-text-muted"
      >
        End Date
      </label>

      <DatePicker
        className="p-1.5 w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        selectsEnd
        selected={filter.end_date}
        startDate={filter.start_date}
        endDate={filter.end_date}
        minDate={filter.start_date}
        onChange={(date) => {
          if (date) {
            const nf: Filter = { ...filter, end_date: date }
            updateFilter(nf)
          }
        }}
      />
    </div>


  </div>);
}

export default DateRange;
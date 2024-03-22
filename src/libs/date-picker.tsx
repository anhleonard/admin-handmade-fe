// Or configure the styling elsewhere.
import "flatpickr/dist/flatpickr.css";

import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { MutableRefObject, useCallback, useRef } from "react";
import { DateOption } from "flatpickr/dist/types/options";

interface MyDatePickerProps {
  label?: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  defaultDate?: DateOption;
  onChange?: (value: Date[]) => void;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  label,
  placeholder,
  className,
  isRequired,
  defaultDate,
  onChange,
}) => {
  const fp1 = useRef() as MutableRefObject<Instance>;

  const inputRef = useCallback((node: any) => {
    if (node !== null) {
      fp1.current = flatpickr(node, {
        onChange: function (selectedDates, dateStr, instance) {
          if (onChange) onChange(selectedDates);
        },
        defaultDate: defaultDate,
      });
    }
  }, []);

  return (
    <div className="w-[500px]">
      <label className="mb-1 block text-sm font-medium text-grey-c600 dark:text-white">
        {label}
        {isRequired ? (
          <span className="text-base text-support-c500"> *</span>
        ) : null}
      </label>
      <input
        type="date"
        ref={inputRef}
        placeholder={placeholder ?? "yyyy/mm/dd"}
        className="w-full rounded-2xl border-[2px] border-grey-c50 px-3 py-3 text-base text-grey-c900 outline-none hover:border-primary-c200 focus:!border-primary-c400 active:!border-primary-c400"
      />
    </div>
  );
};
export default MyDatePicker;

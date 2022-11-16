import "./style.scss";
import "./index.css";
import React, { useEffect, useState } from "react";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { useStores } from "src/functions/stores";
import useMedia  from "src/functions/useMedia";

const moment = require("moment");

import Select from "react-select";

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns";

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range?.startDate, definedRange?.startDate) &&
      isSameDay(range?.endDate, definedRange?.endDate)
    );
  },
};

function formattedDate({ startDate, endDate }) {
  if (startDate === undefined || endDate === undefined) {
    return "";
  }

  let started_at = new Date(startDate);
  let ended_at = new Date(endDate);

  const K_MONTHS = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const K_MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agst",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ];

  if (started_at.getTime() > ended_at.getTime()) {
    return "Format Jadwal Salah";
  }

  if (started_at.getFullYear() !== ended_at.getFullYear()) {
    //"26th August 2021 - 26th August 2022"
    return `${started_at.getDate()} ${
      K_MONTHS_SHORT[started_at.getMonth()]
    } ${started_at.getFullYear()} - ${ended_at.getDate()} ${
      K_MONTHS_SHORT[ended_at.getMonth()]
    } ${ended_at.getFullYear()}`;
  }

  if (started_at.getMonth() !== ended_at.getMonth()) {
    //"26th August - 26th September 2021"
    return `${started_at.getDate()} ${
      K_MONTHS_SHORT[started_at.getMonth()]
    } - ${ended_at.getDate()} ${
      K_MONTHS_SHORT[ended_at.getMonth()]
    } ${ended_at.getFullYear()}`;
  }

  if (started_at.getDate() !== ended_at.getDate()) {
    //"26 - 27 August 2021"
    return `${started_at.getDate()} - ${ended_at.getDate()} ${
      K_MONTHS[ended_at.getMonth()]
    } ${ended_at.getFullYear()}`;
  }

  if (started_at.getFullYear() === ended_at.getFullYear()) {
    // return "26th August 2021"
    return `${ended_at.getDate()} ${
      K_MONTHS[ended_at.getMonth()]
    } ${ended_at.getFullYear()}`;
  }

  return "Format Jadwal Salah";
}

const createStaticRanges = (ranges) => {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
};

const selectStaticRanges = (ranges, selectionDate) => {
  let selectedValue;
  ranges.map((range) => {
    const definedRange = range.range();
    if (
      isSameDay(definedRange.startDate, selectionDate.selection?.startDate) &&
      isSameDay(definedRange.endDate, selectionDate.selection?.endDate)
    ) {
      selectedValue = {
        value: range?.value,
        label: range?.label,
      };
    }
  });

  if (!selectedValue) {
    return { value: "custom", label: "Custom" };
  } else {
    return selectedValue;
  }
};

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const ranges = [
  {
    label: "Hari Ini",
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
    value: "today",
  },
  {
    label: "Kemarin",
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
    value: "yesterday",
  },

  {
    label: "Minggu Ini",
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
    value: "thisweek",
  },
  {
    label: "Minggu Lalu",
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
    value: "lastweek",
  },
  {
    label: "Bulan Ini",
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
    value: "thismonth",
  },
  {
    label: "Bulan Lalu",
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
    value: "lastmonth",
  },
];

const defaultStaticRanges = createStaticRanges(ranges);

const DateRangeComponent = ({
  dateRangeProps,
  onDateChange = () => {},
  value,
  ...props
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const [selectionDate, setSelectionDate] = useState({
    selection: {
      startDate: value?.startDate || startOfDay(new Date()),
      endDate: value?.endDate || endOfDay(new Date()),
      key: "selection",
    },
  });

  const [selectedRangeDate, setSelectedRangeDate] = useState({
    value: "today",
    label: "Hari Ini",
  });

  useEffect(() => {
    onDateChange(selectionDate?.selection);
    setSelectedRangeDate(selectStaticRanges(ranges, selectionDate));
  }, [selectionDate]);

  return (
    <div className="d-flex flex-direction-row">
      <div className="dropdown" style={{ minWidth: 142 }}>
        <Select
          styles={{
            control: (styles) => ({
              ...styles,
              border: "none",
            }),
          }}
          id="choose-time-set"
          placeholder="Minggu Ini"
          name="timeset"
          options={[
            ...ranges.map((rangeData) => {
              return rangeData;
            }),
            { value: "custom", label: "Custom" },
          ]}
          value={selectedRangeDate}
          onChange={(selected_data) => {
            if (selected_data?.value === "custom") {
              setIsShowModal(true);
            } else {
              const newSelectionDate = selected_data.range();
              setSelectionDate({
                selection: {
                  startDate: startOfDay(newSelectionDate?.startDate),
                  endDate: endOfDay(newSelectionDate?.endDate),
                  key: "selection",
                },
              });
            }
          }}
          isClearable={false}
        />
        {isShowModal && (
          <ModalDatePicker
            {...props}
            dateRangeProps={dateRangeProps}
            onModalClosed={() => {
              setIsShowModal(false);
            }}
            setSelectionDate={(newSelectionDate) => {
              setSelectionDate(newSelectionDate);
            }}
            selectionDate={selectionDate}
          />
        )}
      </div>
      <div
        style={{
          backgroundColor: "#fff",
          paddingLeft: 10,
          paddingRight: 10,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          display: "flex",
        }}
      >
        <RenderDate value={value} />
      </div>
    </div>
  );
};

const RenderDate = ({ value }) => {
  return <div className="mr-3 align-self-center">{formattedDate(value)}</div>;
};

const ModalDatePicker = ({
  dateRangeProps,
  selectionDate,
  setSelectionDate,
  onModalClosed,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selection, setSelection] = useState(
    selectionDate || {
      selection: {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    }
  );

  let small = useMedia("(max-width: 1000px)");

  const closeModal = () => {
    onModalClosed();
  };

  return (
    <div
      className="modal show d-block"
      id="add-item-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="add-itemLabel-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-daterange-dialog" role="document">
        <div className="modal-content modal-daterange-autowidth">
          <div className="modal-header">
            <h5 className="modal-title" id="add-itemLabel-modal">
              Pilih Tanggal
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                closeModal();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <DateRangePicker
                editableDateInputs={true}
                onChange={(item) =>
                  setSelection({
                    selection: {
                      startDate: startOfDay(item?.selection?.startDate),
                      endDate: endOfDay(item?.selection?.endDate),
                      key: "selection",
                    },
                  })
                }
                moveRangeOnFirstSelection={false}
                ranges={[selection.selection]}
                showSelectionPreview={false}
                months={small ? 1: 2}
                direction="horizontal"
                rangeColors={["#2CB34D"]}
                staticRanges={defaultStaticRanges}
                inputRanges={[]}
                {...dateRangeProps}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default-dim"
              data-dismiss="modal"
              onClick={() => {
                closeModal();
              }}
            >
              Batal
            </button>
            <button
              disabled={isSubmitting}
              onClick={() => {
                setSelectionDate(selection);
                closeModal();
              }}
              type="button"
              className="btn btn-green"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeComponent;

import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

import { getDate } from "src/functions/Format";

class DatePickerWithMask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmail: false,
      showNotification: false,
      showSettings: false,
      new_error: "",
    };

    this.datePickerRef = null;

    this.ref = this.props.ref;
  }

  render() {
    return (
      <div style={{width:'100%'}}>
        <DatePicker
          ref={this.props.innerRef}
          disabled={this.props.disabled}
          dateFormat={
            this.props.dateFormat ? this.props.dateFormat : "dd/MM/yyyy"
          }
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          selected={this.props.selected}
          onChange={(date) => {
            this.props.onChange ? this.props.onChange(date) : null;
          }}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          customInputRef="ref"
          {...this.props}
          customInput={
            <div style={{ position: "relative" }}>
              <InputMask
                disabled={this.props.disabled}
                className={"form-control"}
                style={this.props.style || { width: 150, height: 40, border: 0 }}
                value={getDate(this.props.selected)}
                mask="99/99/9999"
                placeholder={this.props.placeholder||"dd/mm/yyyy"}
                alwaysShowMask={true}
              />

              <i
                className="fa fa-calendar"
                style={{
                  position: "absolute",
                  right: '8%',
                  bottom: 14,
                  color: "#d0d0d0",
                  pointerEvents: "none",
                }}
              />
            </div>
          }
        />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <DatePickerWithMask innerRef={ref} {...props} />
));

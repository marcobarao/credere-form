import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import _ from "lodash";

import { Group, Label, Error } from "./styles";

const selectStyles = {
  control: styles => ({
    ...styles,
    height: 40,
    margin: "20px 0 10px",
    backgroundColor: "white"
  }),
  option: styles => ({
    ...styles,
    color: "black"
  }),
  input: styles => ({ ...styles }),
  placeholder: styles => ({ ...styles }),
  singleValue: styles => ({ ...styles })
};

const SelectField = ({
  label,
  name,
  placeholder,
  getOptionLabel,
  getOptionValue,
  value,
  onChange,
  options,
  errors,
  touched
}) => {
  return (
    <Group>
      {label ? (
        <Label htmlFor={name}>
          {label} <span>*</span>
        </Label>
      ) : null}
      <Field
        name={name}
        id={name}
        component={({ field }) => (
          <Select
            {...field}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            options={options}
            isLoading={!options.length}
            inputId={name}
            placeholder={placeholder}
            isClearable={true}
            isSearchable={true}
            value={value}
            onChange={onChange}
            styles={selectStyles}
            theme={theme => ({
              ...theme,
              borderRadius: 10,
              colors: {
                ...theme.colors,
                primary50: "#C4D1D6",
                primary25: "#EBF1F2",
                primary: "#EBF1F2",
                neutral20:
                  _.get(errors, name, false) && _.get(touched, name, false)
                    ? "red"
                    : "rgb(202, 202, 202)"
              }
            })}
          />
        )}
      />
      <ErrorMessage name={name} component={Error} />
    </Group>
  );
};

export default SelectField;

import React from "react";
import { Field, ErrorMessage } from "formik";
import _ from "lodash";

import { Group, Label, Mask, Error } from "./styles";

const masks = (mask, field) =>
  mask === "phone"
    ? field.value && field.value.length < 10
      ? "9999-9999?"
      : "99999-9999"
    : mask;

const NormalField = ({
  label,
  name,
  mask,
  maskChar = null,
  permanents = [],
  withError = true,
  code,
  number,
  height,
  errors,
  touched
}) => {
  return (
    <Group code={code} number={number} height={height}>
      {label ? (
        <Label htmlFor={name}>
          {label} <span>*</span>
        </Label>
      ) : null}
      <Field
        name={name}
        id={name}
        render={({ field }) => (
          <Mask
            {...field}
            mask={masks(mask, field)}
            border={
              _.get(errors, name) && _.get(touched, name)
                ? "1px solid red"
                : null
            }
            formatChars={{ "9": "[0-9]", "?": "[0-9 ]" }}
            permanents={permanents}
            maskChar={maskChar}
            id={field.name}
          />
        )}
      />
      {withError && <ErrorMessage name={name} component={Error} />}
    </Group>
  );
};

export default NormalField;

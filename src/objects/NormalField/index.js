import React from "react";
import { ErrorMessage } from "formik";
import _ from "lodash";

import { Group, Label, Field, Error } from "./styles";

const NormalField = ({ label, name, errors, touched }) => {
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
        border={
          _.get(errors, name, false) && _.get(touched, name, false)
            ? "1px solid red"
            : null
        }
      />
      <ErrorMessage name={name} component={Error} />
    </Group>
  );
};

export default NormalField;

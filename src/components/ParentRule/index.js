import React from "react";
import { ErrorMessage } from "formik";

import NormalField from "../../objects/NormalField";
import MaskedField from "../../objects/MaskedField";

import { Subtitle, Error } from "./styles";

const ParentRule = (errors, touched) => {
  return (
    <>
      <Subtitle>Responsável</Subtitle>
      <NormalField
        label="Nome"
        name="parent.name"
        errors={errors}
        touched={touched}
      />
      <MaskedField
        label="Telefone"
        name="parent.phone.code"
        mask="99"
        code="true"
        withError={false}
        errors={errors}
        touched={touched}
      />
      <MaskedField
        name="parent.phone.number"
        mask="phone"
        number="true"
        withError={false}
        errors={errors}
        touched={touched}
      />
      {touched.parent &&
      touched.parent.phone &&
      touched.parent.phone.code &&
      errors.parent &&
      errors.parent.phone &&
      errors.parent.phone.code ? (
        <ErrorMessage name="parent.phone.code" component={Error} />
      ) : (
        <ErrorMessage name="parent.phone.number" component={Error} />
      )}
    </>
  );
};

export default ParentRule;

import React from "react";
import { ErrorMessage } from "formik";

import MaskedField from "../../objects/MaskedField";

import {
  Fieldset,
  Label,
  Unit,
  RadioButton,
  Checked,
  Action,
  Error
} from "./styles";
import Add from "../../assets/images/icons/add.svg";
import Remove from "../../assets/images/icons/remove.svg";

const PhonesArea = ({
  values,
  setFieldValue,
  add,
  remove,
  handleMain,
  errors,
  touched
}) => {
  return (
    <Fieldset>
      <Label htmlFor="phones[0].code">
        Telefone(s) <span>*</span>
      </Label>
      {values.phones
        .filter(phone => !phone.destroy)
        .map((phone, index) => (
          <Unit key={index}>
            <MaskedField
              name={`phones[${index}].code`}
              mask="99"
              code="true"
              withError={false}
              errors={errors}
              touched={touched}
            />
            <MaskedField
              name={`phones[${index}].number`}
              mask="phone"
              number="true"
              withError={false}
              errors={errors}
              touched={touched}
              data-test="phone-unit"
            />
            {touched.phones &&
            touched.phones[index] &&
            touched.phones[index].code &&
            errors.phones &&
            errors.phones[index] &&
            errors.phones[index].code ? (
              <ErrorMessage name={`phones[${index}].code`} component={Error} />
            ) : (
              <ErrorMessage
                name={`phones[${index}].number`}
                component={Error}
              />
            )}

            {values.phones.filter(phone => !phone.destroy).length > 1 ? (
              <>
                <Action
                  center="true"
                  className="remove_phone"
                  onClick={e => {
                    e.preventDefault();
                    remove(index, values, setFieldValue);
                  }}
                  tabIndex="-1"
                  icon={Remove}
                >
                  Remover o telefone
                </Action>
                <RadioButton
                  id={index}
                  name={`phones.main`}
                  type="radio"
                  onChange={() => handleMain(values, index, setFieldValue)}
                  checked={values.phones[index].main}
                />
                <Label htmlFor={index}>
                  <Checked checked={values.phones[index].main} />
                  Principal
                </Label>
              </>
            ) : null}
          </Unit>
        ))}
      {values.phones.filter(phone => !phone.destroy).length < 4 ? (
        <Action
          primary="true"
          icon={Add}
          id="add_phone"
          onClick={e => {
            e.preventDefault();
            add(values, setFieldValue);
          }}
          tabIndex="-1"
        >
          Adicionar novo telefone
        </Action>
      ) : null}
    </Fieldset>
  );
};

export default PhonesArea;

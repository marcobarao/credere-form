import React from "react";

import { Fieldset, Label, Unit, Action } from "./styles";
import Add from "../../assets/images/icons/add.svg";
import Remove from "../../assets/images/icons/remove.svg";
import NormalField from "../../objects/NormalField";

const EmailsArea = ({
  values,
  setFieldValue,
  add,
  remove,
  errors,
  touched
}) => {
  return (
    <Fieldset>
      <Label htmlFor="emails[0].address">
        E-mail(s) <span>*</span>
      </Label>
      {values.emails
        .filter(email => !email.destroy)
        .map((email, index) => (
          <Unit key={index}>
            <NormalField
              width="100%"
              name={`emails[${index}].address`}
              errors={errors}
              touched={touched}
            />
            {values.emails.filter(email => !email.destroy).length > 1 ? (
              <Action
                center="true"
                onClick={e => {
                  e.preventDefault();
                  remove(index, values, setFieldValue);
                }}
                tabIndex="-1"
                icon={Remove}
              >
                Remover o e-mail
              </Action>
            ) : null}
          </Unit>
        ))}
      {values.emails.filter(email => !email.destroy).length < 3 ? (
        <Action
          primary="true"
          icon={Add}
          onClick={e => {
            e.preventDefault();
            add(values, setFieldValue);
          }}
          tabIndex="-1"
        >
          Adicionar novo e-mail
        </Action>
      ) : null}
    </Fieldset>
  );
};

export default EmailsArea;

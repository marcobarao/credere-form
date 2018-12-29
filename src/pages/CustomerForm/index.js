import React, { Component } from "react";
import {
  Formik,
  Form,
  ErrorMessage,
  validateYupSchema,
  yupToFormErrors
} from "formik";
import Select from "react-select";

import {
  Container,
  Title,
  Label,
  Field,
  Mask,
  Fieldset,
  Unit,
  RadioButton,
  Checked,
  Action,
  Error,
  Submit,
  Subtitle
} from "./styles";
import Add from "../../assets/images/icons/add.svg";
import Remove from "../../assets/images/icons/remove.svg";
import ValidationSchema from "./validationSchema";
import ibge from "../../services/ibge";

const selectStyles = {
  control: styles => ({
    ...styles,
    height: 40,
    margin: "10px 0",
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

class CustomerForm extends Component {
  state = {
    stateOptions: [],
    cityOptions: [],
    customer: {
      name: "",
      birthday: "",
      driver_license: {
        number: "",
        issued_at: ""
      },
      state: "",
      city: "",
      phones: [{ code: "", number: "", main: true }],
      emails: [{ address: "" }],
      parent: {
        name: "",
        phone: {
          code: "",
          number: ""
        }
      }
    }
  };

  handleSubmit = values => {
    console.log(values);
  };

  handleMain = ({ phones }, index, setFieldValue) => {
    setFieldValue(
      "phones",
      phones.map((phone, i) =>
        index !== i ? { ...phone, main: false } : { ...phone, main: true }
      )
    );
    console.log(phones);
  };

  async componentDidMount() {
    const resStates = await ibge.get("localidades/estados/");

    const stateOptions = resStates.data.sort((a, b) => {
      if (a.nome > b.nome) {
        return 1;
      }
      if (a.nome < b.nome) {
        return -1;
      }
      return 0;
    });
    this.setState({ stateOptions });
  }

  getAge = ({ birthday }) => {
    const dateSplit = birthday.split("/");
    const date = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);

    const ageMs = Date.now() - date.getTime();
    const ageDate = new Date(ageMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  getCities = async id => {
    const resCities = await ibge.get(`localidades/estados/${id}/municipios`);

    const cityOptions = resCities.data.sort((a, b) => {
      if (a.nome > b.nome) {
        return 1;
      }
      if (a.nome < b.nome) {
        return -1;
      }
      return 0;
    });
    this.setState({ cityOptions });
  };

  cityRule = (values, errors, setFieldValue, touched) => {
    const { cityOptions } = this.state;
    return values.state === "RN" &&
      values.driver_license.number.startsWith("6") ? (
      <>
        <Label htmlFor="city">
          Cidade <span>*</span>
        </Label>
        <Field
          name="city"
          component={({ field }) => (
            <Select
              {...field}
              getOptionLabel={option => option.nome}
              getOptionValue={option => option.id}
              options={cityOptions}
              isLoading={!cityOptions.length}
              placeholder="Selecione a sua cidade"
              isClearable={true}
              isSearchable={true}
              value={cityOptions.find(option => option.nome === field.value)}
              onChange={option => {
                setFieldValue(field.name, option ? option.nome : "");
              }}
              inputId={field.name}
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
                    errors.city && touched.city ? "red" : "rgb(202, 202, 202)"
                }
              })}
            />
          )}
        />
        <ErrorMessage name="city" component={Error} />
      </>
    ) : null;
  };

  driverLicenseRule = (values, errors, touched) => {
    return (
      this.getAge(values) >= 18 && (
        <>
          <Label htmlFor="driver_license.number">
            Carteira de motorista <span>*</span>
          </Label>
          <Field
            name="driver_license.number"
            render={({ field }) => (
              <Mask
                {...field}
                mask="99999999999"
                border={
                  errors.driver_license &&
                  errors.driver_license.number &&
                  touched.driver_license &&
                  touched.driver_license.number
                    ? "1px solid red"
                    : null
                }
                maskChar={null}
                id={field.name}
              />
            )}
          />
          <ErrorMessage name="driver_license.number" component={Error} />
          <Label htmlFor="driver_license.issued_at">
            Orgão emissor <span>*</span>
          </Label>
          <Field
            name="driver_license.issued_at"
            id="driver_license.issued_at"
            border={
              errors.driver_license &&
              errors.driver_license.issued_at &&
              touched.driver_license &&
              touched.driver_license.issued_at
                ? "1px solid red"
                : null
            }
          />
          <ErrorMessage name="driver_license.issued_at" component={Error} />
        </>
      )
    );
  };

  addPhone = ({ phones }, setFieldValue) => {
    setFieldValue(
      "phones",
      phones.concat([{ code: "", number: "", main: false }])
    );
  };

  removePhone = (index, { phones }, setFieldValue) => {
    setFieldValue("phones", phones.filter((phone, i) => index !== i));
  };

  parentRule = (values, errors, touched) => {
    return (
      this.getAge(values) < 18 && (
        <>
          <Subtitle>Responsável</Subtitle>
          <Label htmlFor="parent.name">
            Nome <span>*</span>
          </Label>
          <Field
            name="parent.name"
            id="parent.name"
            border={
              errors.parent &&
              errors.parent.name &&
              touched.parent &&
              touched.parent.name
                ? "1px solid red"
                : null
            }
          />
          <ErrorMessage name="parent.name" component={Error} />
          <Label htmlFor="parent.phone.code">
            Telefone <span>*</span>
          </Label>
          <Field
            name="parent.phone.code"
            code="true"
            render={({ field }) => (
              <Mask
                {...field}
                code="true"
                mask="99"
                border={
                  errors.parent &&
                  errors.parent.phone &&
                  errors.parent.phone.code &&
                  touched.parent &&
                  touched.parent.phone &&
                  touched.parent.phone.code
                    ? "1px solid red"
                    : null
                }
                maskChar={null}
                id={field.name}
              />
            )}
          />
          <Field
            name="parent.phone.number"
            number="true"
            render={({ field }) => (
              <Mask
                {...field}
                number="true"
                mask={
                  field.value && field.value.length < 10
                    ? "9999-9999?"
                    : "99999-9999"
                }
                formatChars={{ "9": "[0-9]", "?": "[0-9 ]" }}
                border={
                  errors.parent &&
                  errors.parent.phone &&
                  errors.parent.phone.number &&
                  touched.parent &&
                  touched.parent.phone &&
                  touched.parent.phone.number
                    ? "1px solid red"
                    : null
                }
                maskChar={null}
                id={field.name}
              />
            )}
          />
          <ErrorMessage name="parent.phone.code" component={Error} />
        </>
      )
    );
  };

  render() {
    const { stateOptions, customer } = this.state;
    return (
      <Formik
        initialValues={customer}
        validateOnBlur={false}
        validateOnChange={false}
        validate={values => {
          const dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}.*/);
          const age = this.getAge(values) >= 18;
          const parent_area = !age && dateRegex.test(values.birthday);
          const city = values.state === "RN";
          try {
            validateYupSchema(values, ValidationSchema, true, {
              age,
              city,
              parent_area
            });
          } catch (err) {
            return yupToFormErrors(err);
          }

          return {};
        }}
        onSubmit={this.handleSubmit}
      >
        {({ setFieldValue, errors, values, touched }) => (
          <Container>
            <Form>
              <Title>Cliente</Title>
              <Label htmlFor="name">
                Nome <span>*</span>
              </Label>
              <Field
                name="name"
                id="name"
                border={errors.name && touched.name ? "1px solid red" : null}
              />
              <ErrorMessage name="name" component={Error} />
              <Label htmlFor="birthday">
                Data de nascimento <span>*</span>
              </Label>
              <Field
                name="birthday"
                render={({ field }) => (
                  <Mask
                    {...field}
                    mask="99/99/9999"
                    border={
                      errors.birthday && touched.birthday
                        ? "1px solid red"
                        : null
                    }
                    permanents={[2, 5]}
                    maskChar="_"
                    id={field.name}
                  />
                )}
              />
              <ErrorMessage name="birthday" component={Error} />
              {this.driverLicenseRule(values, errors, touched)}
              <Label htmlFor="state">
                Estado <span>*</span>
              </Label>
              <Field
                name="state"
                component={({ field }) => (
                  <Select
                    {...field}
                    getOptionLabel={option => option.nome}
                    getOptionValue={option => option.sigla}
                    options={stateOptions}
                    inputId={field.name}
                    placeholder="Selecione seu estado"
                    isClearable={true}
                    isSearchable={true}
                    value={stateOptions.find(
                      option => option.sigla === field.value
                    )}
                    onChange={option => {
                      setFieldValue(field.name, option ? option.sigla : "");
                      if (option && option.sigla === "RN")
                        this.getCities(option.id);
                    }}
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
                          errors.state && touched.state
                            ? "red"
                            : "rgb(202, 202, 202)"
                      }
                    })}
                  />
                )}
              />
              <ErrorMessage name="state" component={Error} />
              {this.cityRule(values, errors, setFieldValue, touched)}
              <Fieldset>
                <Label htmlFor="phones[].code">
                  Telefone(s) <span>*</span>
                </Label>
                {values.phones.map((phone, index) => (
                  <Unit key={index}>
                    <Field
                      name={`phones[${index}].code`}
                      code="true"
                      render={({ field }) => (
                        <Mask
                          {...field}
                          code="true"
                          mask="99"
                          border={
                            errors.phones &&
                            errors.phones[index] &&
                            touched.phones &&
                            touched.phones[index]
                              ? "1px solid red"
                              : null
                          }
                          maskChar={null}
                          id={field.name}
                        />
                      )}
                    />
                    <Field
                      name={`phones[${index}].number`}
                      number="true"
                      render={({ field }) => (
                        <Mask
                          {...field}
                          number="true"
                          mask={
                            field.value && field.value.length < 10
                              ? "9999-9999?"
                              : "99999-9999"
                          }
                          formatChars={{ "9": "[0-9]", "?": "[0-9 ]" }}
                          border={
                            errors.phones &&
                            errors.phones[index] &&
                            touched.phones &&
                            touched.phones[index]
                              ? "1px solid red"
                              : null
                          }
                          maskChar={null}
                          id={field.name}
                        />
                      )}
                    />
                    {values.phones.length > 1 ? (
                      <>
                        <Action
                          center="true"
                          onClick={e => {
                            e.preventDefault();
                            this.removePhone(index, values, setFieldValue);
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
                          onChange={e =>
                            this.handleMain(values, index, setFieldValue)
                          }
                          checked={values.phones[index].main}
                        />
                        <Label htmlFor={index}>
                          <Checked checked={values.phones[index].main} />
                          Principal
                        </Label>
                      </>
                    ) : null}
                    <ErrorMessage
                      name={`phones[${index}].number`}
                      component={Error}
                    />
                  </Unit>
                ))}
                {values.phones.length < 4 ? (
                  <Action
                    primary="true"
                    icon={Add}
                    onClick={e => {
                      e.preventDefault();
                      this.addPhone(values, setFieldValue);
                    }}
                    tabIndex="-1"
                  >
                    Adicionar novo telefone
                  </Action>
                ) : null}
              </Fieldset>
              <Label htmlFor="emails[0].address">
                E-mail(s) <span>*</span>
              </Label>
              <Field
                name="emails[0].address"
                id="emails[0].address"
                border={
                  errors.emails && touched.emails ? "1px solid red" : null
                }
              />
              <ErrorMessage name="emails[0].address" component={Error} />
              {this.parentRule(values, errors, touched)}
              <Submit type="submit">Salvar</Submit>
            </Form>
          </Container>
        )}
      </Formik>
    );
  }
}

export default CustomerForm;

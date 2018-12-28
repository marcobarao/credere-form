import React, { Component } from "react";
import {
  Formik,
  Form,
  ErrorMessage,
  validateYupSchema,
  yupToFormErrors
} from "formik";
import Select from "react-select";

import { Container, Title, Label, Field, Mask, Error, Submit } from "./styles";
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
      state: ""
    }
  };

  handleSubmit = values => {
    console.log(values);
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
    return (
      values.state === "RN" && (
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
      )
    );
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
                maskChar="_"
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

  render() {
    const { stateOptions, customer } = this.state;
    return (
      <Formik
        initialValues={customer}
        // validateOnBlur={false}
        // validateOnChange={false}
        validate={values => {
          const age = this.getAge(values) >= 18;
          const city = values.state === "RN";
          try {
            validateYupSchema(values, ValidationSchema, true, {
              age,
              city
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
              <Submit type="submit">Salvar</Submit>
            </Form>
          </Container>
        )}
      </Formik>
    );
  }
}

export default CustomerForm;

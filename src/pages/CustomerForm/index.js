import React, { Component } from "react";
import { Formik, Form, validateYupSchema, yupToFormErrors } from "formik";
import Alert from "react-s-alert";

import { Container, Title, Submit } from "./styles";
import ValidationSchema from "./validationSchema";
import ibge from "../../services/ibge";
import api from "../../services/api";

import NormalField from "../../objects/NormalField";
import MaskedField from "../../objects/MaskedField";
import SelectField from "../../objects/SelectField";
import ParentRule from "../../components/ParentRule";
import DriverLicenseRule from "../../components/DriverLicenseRule";
import CityRule from "../../components/CityRule";
import PhonesArea from "../../components/PhonesArea";
import EmailsArea from "../../components/EmailsArea";

const dateRegex = new RegExp(
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
);

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

  validate = values => {
    const ofAge = this.isOfAge(values);
    const parent = !ofAge && dateRegex.test(values.birthday);
    const city = values.state === "RN";
    try {
      validateYupSchema(values, ValidationSchema, true, {
        ofAge,
        city,
        parent
      });
    } catch (err) {
      return yupToFormErrors(err);
    }

    return {};
  };

  edit = async values => {
    const { customer } = this.state;
    if (this.isOfAge(values) !== this.isOfAge(customer)) {
      this.isOfAge(values)
        ? (values.parent = { ...values.parent, destroy: true })
        : (values.driver_license = { ...values.driver_license, destroy: true });
    }

    await api.put("update.json", values);
    return values;
  };

  create = async values => {
    await api.post("create.json", values);
    return values;
  };

  handleSubmit = values => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const result = id ? this.edit(values) : this.create(values);
    Alert.success("Cliente salvo com sucesso :)", {
      position: "bottom-right",
      effect: "slide"
    });
    result.then(values => console.log(values)).catch(err => console.log(err));
  };

  handleMain = ({ phones }, index, setFieldValue) => {
    setFieldValue(
      "phones",
      phones.map((phone, i) =>
        index !== i ? { ...phone, main: false } : { ...phone, main: true }
      )
    );
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    if (id) {
      const resCustomer = await api.get("show.json");
      const customer = resCustomer.data.customer;
      if (customer.state === "RN") this.getCities(24);
      customer.driver_license = customer.driver_license || {
        number: "",
        issued_at: ""
      };
      customer.parent = customer.parent || {
        name: "",
        phone: {
          code: "",
          number: ""
        }
      };
      customer.city = customer.city || "";
      this.setState({ customer });
    }

    const resStates = await ibge.get("localidades/estados/");

    const stateOptions = resStates.data.sort((a, b) =>
      a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0
    );
    this.setState({ stateOptions });
  }

  isOfAge = ({ birthday }) => {
    const dateSplit = birthday.split("/");
    const date = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);

    const ageMs = Date.now() - date.getTime();
    const ageDate = new Date(ageMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  };

  getCities = async id => {
    const resCities = await ibge.get(`localidades/estados/${id}/municipios`);

    const cityOptions = resCities.data.sort((a, b) =>
      a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0
    );
    this.setState({ cityOptions });
  };

  addField = (name, concat) => (values, setFieldValue) => {
    setFieldValue(name, values[name].concat(concat));
  };

  removeField = name => (index, values, setFieldValue) => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    id
      ? setFieldValue(
          name,
          values[name]
            .map((item, i) =>
              index === i
                ? item.hasOwnProperty("id")
                  ? { ...item, destroy: true }
                  : ""
                : item
            )
            .filter(item => item)
        )
      : setFieldValue(name, values[name].filter((item, i) => index !== i));
  };

  render() {
    const { stateOptions, cityOptions, customer } = this.state;

    return (
      <Formik
        initialValues={customer}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }) => (
          <Container>
            <Form>
              <Title>Cliente</Title>
              <NormalField
                label="Nome"
                name="name"
                errors={errors}
                touched={touched}
              />
              <MaskedField
                label="Data de nascimento"
                name="birthday"
                mask="99/99/9999"
                permanents={[2, 5]}
                errors={errors}
                touched={touched}
                height="true"
              />
              {/* Mostra as informações de carteira de motorista se for maior de idade */}
              {this.isOfAge(values) && dateRegex.test(values.birthday) ? (
                <DriverLicenseRule errors={errors} touched={touched} />
              ) : null}
              <SelectField
                label="Estado"
                name="state"
                placeholder="Selecione seu estado"
                getOptionLabel={option => option.nome}
                getOptionValue={option => option.sigla}
                value={stateOptions.find(
                  option => option.sigla === values.state
                )}
                onChange={option => {
                  setFieldValue("state", option ? option.sigla : "");

                  if (option && option.sigla === "RN") {
                    this.getCities(option.id);
                  } else {
                    setFieldValue("city", "");
                  }
                }}
                options={stateOptions}
                errors={errors}
                touched={touched}
              />
              {values.state === "RN" &&
              values.driver_license.number.startsWith("6") ? (
                <CityRule
                  options={cityOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              ) : null}
              <PhonesArea
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                add={this.addField("phones", [
                  { code: "", number: "", main: false }
                ])}
                remove={this.removeField("phones")}
                handleMain={this.handleMain}
              />
              <EmailsArea
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                add={this.addField("emails", [{ address: "" }])}
                remove={this.removeField("emails")}
              />
              {/* Se idade for menor que 18 aparece os campos de responsáveis */}
              {!this.isOfAge(values) && dateRegex.test(values.birthday) ? (
                <ParentRule errors={errors} touched={touched} />
              ) : null}
              <Submit type="submit" onClick={handleSubmit}>
                Salvar
              </Submit>
            </Form>
          </Container>
        )}
      </Formik>
    );
  }
}

export default CustomerForm;

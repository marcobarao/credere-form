import React from "react";
import SelectField from "../../objects/SelectField";

const CityRule = ({ options, values, setFieldValue, errors, touched }) => {
  return (
    <SelectField
      label="Cidade"
      name="city"
      placeholder="Selecione sua cidade"
      getOptionLabel={option => option.nome}
      getOptionValue={option => option.id}
      value={options.find(option => option.nome === values.city)}
      onChange={option => {
        setFieldValue("city", option ? option.nome : "");
      }}
      options={options}
      errors={errors}
      touched={touched}
    />
  );
};

export default CityRule;

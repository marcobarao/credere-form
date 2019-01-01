import React from "react";

import MaskedField from "../../objects/MaskedField";

const DriverLicenseRule = (errors, touched) => {
  return (
    <>
      <MaskedField
        label="Carteira de motorista"
        name="driver_license.number"
        mask="99999999999"
        height="true"
        errors={errors}
        touched={touched}
      />
      <MaskedField
        label="Data de emissão"
        name="driver_license.issued_at"
        mask="99/99/9999"
        height="true"
        permanents={[2, 5]}
        errors={errors}
        touched={touched}
      />
    </>
  );
};

export default DriverLicenseRule;

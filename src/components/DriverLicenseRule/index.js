import React from "react";

import NormalField from "../../objects/NormalField";
import MaskedField from "../../objects/MaskedField";

const DriverLicenseRule = (errors, touched) => {
  return (
    <>
      <MaskedField
        label="Carteira de motorista"
        name="driver_license.number"
        mask="99999999999"
        errors={errors}
        touched={touched}
      />
      <NormalField
        label="Orgão emissor"
        name="driver_license.issued_at"
        errors={errors}
        touched={touched}
      />
    </>
  );
};

export default DriverLicenseRule;

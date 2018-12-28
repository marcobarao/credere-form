import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .min(3, "Digite seu nome completo")
    .max(80, "O nome contêm muitos caracteres")
    .required("Digite seu nome"),
  birthday: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}.*/, "Digite uma data valida")
    .required("Digite a sua data de nascimento"),
  driver_license: Yup.object().shape({
    number: Yup.string().when("$age", {
      is: true,
      then: Yup.string()
        .matches(
          /^\d{11}.*/,
          "Digite o número da sua carteira de motorista corretamente"
        )
        .required("Digite o número da carteira de motorista"),
      otherwise: Yup.string()
    }),
    issued_at: Yup.string().when("$age", {
      is: true,
      then: Yup.string()
        .min(3, "Digite corretamente o nome do orgão emissor")
        .max(20, "Nome do orgão emissor contêm muitos caracteres")
        .required("Digite o orgão emissor da sua carteira"),
      otherwise: Yup.string()
    })
  }),
  state: Yup.string().required("Selecione o estado onde você mora"),
  city: Yup.string().when("$city", {
    is: true,
    then: Yup.string().required("Selecione a cidade que você mora"),
    otherwise: Yup.string()
  })
});

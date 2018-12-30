import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .min(3, "Digite seu nome completo")
    .max(80, "O nome contêm muitos caracteres")
    .required("Digite seu nome"),
  birthday: Yup.string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "Digite uma data valida"
    )
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
  }),
  phones: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.string()
          .matches(/^\d{2}.*/, "Digite o telefone corretamente")
          .required("Digite o seu telefone"),
        number: Yup.string()
          .matches(/^\d{4,5}-\d{4}.*/, "Digite o telefone corretamente")
          .required("Digite o seu telefone")
      })
    )
    .compact()
    .min(1, "Digite ao menos um telefone")
    .max(4, "Digite no máximo 4 telefones"),
  emails: Yup.array()
    .of(
      Yup.object().shape({
        address: Yup.string()
          .email("Digite um e-mail válido")
          .required("Digite o seu e-mail")
      })
    )
    .compact()
    .min(1, "Digite ao menos um e-mail")
    .max(3, "Digite no máximo 3 e-mails"),
  parent: Yup.object().shape({
    name: Yup.string().when("$parent_area", {
      is: true,
      then: Yup.string()
        .min(3, "Digite seu nome completo do responsável")
        .max(80, "O nome do responsável contêm muitos caracteres")
        .required("Digite o nome do seu responsável"),
      otherwise: Yup.string()
    }),
    phone: Yup.object().shape({
      code: Yup.string().when("$parent_area", {
        is: true,
        then: Yup.string()
          .matches(/^\d{2}.*/, "Digite o telefone corretamente")
          .required("Digite o telefone do seu responsável"),
        otherwise: Yup.string()
      }),
      number: Yup.string().when("$parent_area", {
        is: true,
        then: Yup.string()
          .matches(/^\d{4,5}-\d{4}.*/, "Digite o telefone corretamente")
          .required("Digite o telefone do seu responsável"),
        otherwise: Yup.string()
      })
    })
  })
});

import styled, { css } from "styled-components";
import { Field as FormikField } from "formik";
import InputMask from "react-input-mask";

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  line-height: 42px;
  font-weight: bold;
  color: #454553;
`;

const Label = styled.label`
  display: block;
  clear: left;
  font-family: "Libre Baskerville", serif;
  font-size: 17px;
  line-height: 22px;
  color: #454553;
  margin: 20px 0 10;
  > span {
    color: #d14e63;
  }
`;

const Field = styled(FormikField)`
  float: left;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #454553;
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-sizing: border-box;
  border: ${props => props.border || "1px solid #cacaca"};
`;

const Mask = styled(InputMask)`
  float: left;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #454553;
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-sizing: border-box;
  border: ${props => props.border || "1px solid #cacaca"};

  ${props =>
    props.code &&
    css`
      width: 19%;
      margin: 10px 2% 10px 0;
      padding: 10px 15px;
    `}

  ${props =>
    props.number &&
    css`
      width: 79%;
      margin: 10px 0;
      padding: 10px 15px;
    `}
`;

const Error = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #d14e63;
  margin: 10px;
`;

const Submit = styled.button`
  display: inline-block;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  background-color: #4aa0d5;
  border: none;
  border-radius: 5px;
  margin: 20px 0;
  padding: 17px 67px;
  box-shadow: 0 4px #d4d3d3;
  transition: background-color 200ms linear;

  &:hover {
    background-color: #1695e3;
  }

  &:active {
    background-color: #1695e3;
    box-shadow: 0 2px #acacac;
    transform: translateY(2px);
  }
`;

export { Container, Title, Label, Field, Mask, Error, Submit };

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

const Subtitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  line-height: 32px;
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
  &:hover {
    > span {
      width: 14px;
      height: 14px;
      background-color: #4aa0d5;
      border: 4px solid #e9e9ea;
    }
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

const Fieldset = styled.fieldset`
  position: relative;
  padding: 0;
  border: none;
`;

const Unit = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Checked = styled.span`
  display: inline-block;
  background-color: ${props => (props.checked ? "#4aa0d5" : "#e9e9ea")};
  width: 11px;
  height: 11px;
  margin: 0 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border: 7px solid #e9e9ea;
  -moz-border-radius: 50%;
  border-radius: 50%;
  transition: all 100ms ease-out;
`;

const RadioButton = styled.input`
  display: none;
`;

const Action = styled.button`
  position: absolute;
  ${props =>
    props.center
      ? css`
          top: 30px;
          right: 0;
          transform: translateY(-50%);
        `
      : css`
          right: 0;
          bottom: 0;
        `}
  width: 24px;
  height: 24px;
  text-indent: -9999px;
  padding: 4px;
  background-color: ${props => (props.primary ? "#4aa0d5" : "transparent")};
  background-image: url(${props => props.icon});
  background-size: 16px;
  background-repeat: no-repeat;
  background-origin: content-box;
  border: none;
  border-radius: 50%;
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

export {
  Container,
  Title,
  Subtitle,
  Label,
  Field,
  Mask,
  Fieldset,
  Unit,
  Checked,
  RadioButton,
  Action,
  Error,
  Submit
};

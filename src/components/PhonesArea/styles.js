import styled, { css } from "styled-components";

const Label = styled.label`
  display: block;
  clear: left;
  font-family: "Libre Baskerville", serif;
  font-size: 17px;
  line-height: 22px;
  color: #454553;
  margin: 20px 0 10px;
  > span {
    color: #d14e63;
  }
`;

const Fieldset = styled.fieldset`
  position: relative;
  padding: 0;
  border: none;
  width: 100%;
`;

const Unit = styled.div`
  float: left;
  position: relative;
  width: 100%;
  height: 100%;

  @media (min-width: 560px) and (max-width: 1119px) {
    width: 49%;
    &:nth-child(even) {
      margin-right: 2%;
    }
  }

  @media (min-width: 1120px) {
    width: 31%;
    margin: 0 1%;
  }
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
          right: 5px;
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

export { Action, Error, Fieldset, RadioButton, Unit, Checked, Label };

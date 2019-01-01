import styled, { css } from "styled-components";
import InputMask from "react-input-mask";

const Group = styled.div`
  float: left;
  position: relative;
  width: 100%;
  ${props =>
    props.height &&
    css`
      height: 135px;
    `}

  @media (min-width: 560px) and (max-width: 1119px) {
    width: 49%;
    &:nth-child(even) {
      margin-right: ${props => (props.number ? "0" : "2%")};
    }
  }

  @media (min-width: 1120px) {
    width: 31%;
    ${props =>
      props.number
        ? css`
            margin-right: 0;
          `
        : css`
            margin: 0 1%;
          `};
  }
  ${props =>
    props.code &&
    css`
      width: 55px !important;
      margin-right: 2%;
    `}

  ${props =>
    props.number &&
    css`
      width: calc(98% - 55px) !important;
      margin-right: 0;
    `}

    &:last-of-type {
    margin-bottom: 20px;
  }
`;

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
`;

const Error = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #d14e63;
  margin: 10px;
`;

export { Group, Label, Mask, Error };

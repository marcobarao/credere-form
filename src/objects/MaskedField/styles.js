import styled, { css } from "styled-components";
import InputMask from "react-input-mask";

const Group = styled.div``;

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

export { Group, Label, Mask, Error };

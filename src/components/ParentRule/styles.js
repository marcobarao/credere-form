import styled from "styled-components";

const Subtitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  color: #454553;
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

const Error = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #d14e63;
  margin: 10px;
`;

export { Subtitle, Label, Unit, Error };

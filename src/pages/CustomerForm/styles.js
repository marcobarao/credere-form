import styled from "styled-components";

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

export { Container, Title, Submit };

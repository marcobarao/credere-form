import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Form from "../src/pages/Form";
import NotFound from "../src/pages/NotFound";
import App from "../src/App";

describe("Testing Routes", () => {
  it("should render 404", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/random"]} initialIndex={0}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Form)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
  it("should render Form Component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});

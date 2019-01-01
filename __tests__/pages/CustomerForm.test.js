import React from "react";
import { mount } from "enzyme";

import CustomerForm from "../../src/pages/CustomerForm";
import DriverLicenseRule from "../../src/components/DriverLicenseRule";
import ParentRule from "../../src/components/ParentRule";
import CityRule from "../../src/components/CityRule";
import SelectField from "../../src/objects/SelectField";
import { Form } from "formik";
import EmailsArea from "../../src/components/EmailsArea";
import { Unit } from "../../src/components/EmailsArea/styles";

const wait = fn => setInterval(fn, 2000);

describe("Testing form", () => {
  it("should render DriverLicenseRule", () => {
    const wrapper = mount(<CustomerForm match={{ params: {} }} />);
    const birthday = wrapper.find("input[name='birthday']");

    birthday.simulate("change", {
      target: { name: "birthday", value: "16/05/2000" }
    });

    expect(wrapper.find(DriverLicenseRule)).toHaveLength(1);
  });

  it("should render ParentRule", () => {
    const wrapper = mount(<CustomerForm match={{ params: {} }} />);
    const birthday = wrapper.find("input[name='birthday']");

    birthday.simulate("change", {
      target: { name: "birthday", value: "16/05/2001" }
    });

    expect(wrapper.find(ParentRule)).toHaveLength(1);
  });

  it("should render CityRule", () => {
    const wrapper = mount(<CustomerForm match={{ params: {} }} />);
    const birthday = wrapper.find("input[name='birthday']");
    const state = wrapper.find(SelectField).at(0);

    const option = {
      id: 24,
      nome: "Rio Grande do Norte",
      regiao: {
        id: 2,
        nome: "Nordeste",
        sigla: "NE"
      },
      sigla: "RN"
    };

    state.props().onChange(option);

    birthday.simulate("change", {
      target: { name: "birthday", value: "16/05/2000" }
    });

    const driver_license = wrapper.find("input[name='driver_license.number']");

    driver_license.simulate("change", {
      target: { name: "driver_license.number", value: "65432112345" }
    });

    expect(wrapper.find(CityRule)).toHaveLength(1);
  });

  it("should validate void Form", async () => {
    const wrapper = mount(<CustomerForm match={{ params: {} }} />);
    const spyValidate = jest.spyOn(wrapper.instance(), "validate");
    const spyHandleSubmit = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate();
    const submit = wrapper.find(Form);

    submit.simulate("submit");
    await wait(() => {
      expect(spyValidate).toHaveBeenCalled();
      expect(spyHandleSubmit).not.toHaveBeenCalled();
    });
  });

  it("should validate Form without errors", async () => {
    const wrapper = mount(<CustomerForm match={{ params: {} }} />);
    const spyValidate = jest.spyOn(wrapper.instance(), "validate");
    const spyHandleSubmit = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate();
    const submit = wrapper.find(Form);

    const option = {
      id: 35,
      sigla: "SP",
      nome: "São Paulo",
      regiao: { id: 3, sigla: "SE", nome: "Sudeste" }
    };

    wrapper.find("input[name='name']").simulate("change", {
      target: { name: "name", value: "Marco Antônio Barão Neves" }
    });
    wrapper.find("input[name='birthday']").simulate("change", {
      target: { name: "birthday", value: "16/05/2000" }
    });
    wrapper.find("input[name='driver_license.number']").simulate("change", {
      target: { name: "driver_license.number", value: "12345678901" }
    });
    wrapper.find("input[name='driver_license.issued_at']").simulate("change", {
      target: { name: "driver_license.issued_at", value: "11/07/2018" }
    });
    wrapper
      .find(SelectField)
      .at(0)
      .props()
      .onChange(option);
    wrapper.find("input[name='phones[0].code']").simulate("change", {
      target: { name: "phones[0].code", value: "11" }
    });
    wrapper.find("input[name='phones[0].number']").simulate("change", {
      target: { name: "phones[0].number", value: "98422-6444" }
    });
    wrapper.find("input[name='emails[0].address']").simulate("change", {
      target: { name: "emails[0].address", value: "marco.barao@outlook.com" }
    });

    submit.simulate("submit");
    await wait(() => {
      expect(spyValidate).toHaveBeenCalled();
      expect(spyHandleSubmit).toHaveBeenCalled();
    });
  });
  describe("Testing emails area", () => {
    it("don't show remove button with one field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const remove = wrapper.find("button.remove_email");

      const fieldQuantity = wrapper.find("[data-test='email-unit']");

      expect(fieldQuantity).toHaveLength(1);
      expect(remove).toHaveLength(0);
    });
    it("don't show add button with three fields", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const add = wrapper.find("button#add_email");

      add.simulate("click");
      add.simulate("click");

      const addAfter = wrapper.find("button#add_email");
      const fieldQuantity = wrapper.find("[data-test='email-unit']");

      expect(fieldQuantity).toHaveLength(3);
      expect(addAfter).toHaveLength(0);
    });
    it("add field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const spyAdd = jest.spyOn(wrapper.instance(), "addField");

      const add = wrapper.find("button#add_email");
      add.simulate("click");

      const fieldQuantity = wrapper.find("[data-test='email-unit']");

      expect(fieldQuantity).toHaveLength(2);
      expect(spyAdd).toHaveBeenCalled();
    });
    it("remove field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const spyRemove = jest.spyOn(wrapper.instance(), "removeField");

      const add = wrapper.find("button#add_email");
      add.simulate("click");

      const remove = wrapper.find("button.remove_email").at(1);
      remove.simulate("click");

      const fieldQuantity = wrapper.find("[data-test='email-unit']");

      expect(fieldQuantity).toHaveLength(1);
      expect(spyRemove).toHaveBeenCalled();
    });
  });
  describe("Testing phones area", () => {
    it("don't show remove button with one field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const remove = wrapper.find("button.remove_phone");

      const fieldQuantity = wrapper.find("[data-test='phone-unit']");

      expect(fieldQuantity).toHaveLength(1);
      expect(remove).toHaveLength(0);
    });
    it("don't show add button with three fields", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const add = wrapper.find("button#add_phone");

      add.simulate("click");
      add.simulate("click");
      add.simulate("click");

      const addAfter = wrapper.find("button#add_phone");
      const fieldQuantity = wrapper.find("[data-test='phone-unit']");

      expect(fieldQuantity).toHaveLength(4);
      expect(addAfter).toHaveLength(0);
    });
    it("add field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const spyAdd = jest.spyOn(wrapper.instance(), "addField");

      const add = wrapper.find("button#add_phone");
      add.simulate("click");

      const fieldQuantity = wrapper.find("[data-test='phone-unit']");

      expect(fieldQuantity).toHaveLength(2);
      expect(spyAdd).toHaveBeenCalled();
    });
    it("remove field", () => {
      const wrapper = mount(<CustomerForm match={{ params: {} }} />);
      const spyRemove = jest.spyOn(wrapper.instance(), "removeField");

      const add = wrapper.find("button#add_phone");
      add.simulate("click");

      const remove = wrapper.find("button.remove_phone").at(1);
      remove.simulate("click");

      const fieldQuantity = wrapper.find("[data-test='phone-unit']");

      expect(fieldQuantity).toHaveLength(1);
      expect(spyRemove).toHaveBeenCalled();
    });
  });
});

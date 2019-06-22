import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import NavBar from "./NavBar";
import Input from "./Input";
import Output from "./Output";
import colors from "./colors.js";
//most of the remaining functionality needs functional testing with back-end integration

const cuisines = {General: true, Vegetarian: true, American: true, French: true, Indian: true, Italian: true, Jewish: true};

const dish = {
  name: "Potato Pie",
  recipe: "Slice potatoes and onions, stew with a little water until nearly done, put into a pie-dish, flavour with herbs, pepper, and salt, add a little soaked tapioca and very little butter, cover with short wheatmeal crust, and bake 1 hour. To make a very plain pie-crust use about 2 oz. of butter or a proportionate quantity of Allinson frying oil to 1 lb. of wheatmeal. Roll or touch with the fingers as little as possible, and mix with milk instead of water. Eat this pie with green vegetables.",
  source: "The Allinson Vegetarian Cookery Book, by Thomas R. Allinson, 1915",
  cuisine: "Vegetarian"
};

it("renders navbar properly", () => {
  const wrapper = shallow(<NavBar cuisines={cuisines} scheme={colors["lavender"]} />);
  const instruction = <div className="msg instruction-msg">Click to select cuisines</div>;
  expect(wrapper.contains(instruction)).toEqual(true);
});

it("renders input properly", () => {
  const wrapper = shallow(<Input cuisines={cuisines} scheme={colors["lavender"]} />);
  expect(wrapper.exists("input")).toEqual(true);
  expect(wrapper.find("input").get(0).props.placeholder).toEqual("What dish are you going to cook?");
});

it("renders output properly", () => {
  const wrapper = shallow(<Output dish={[]} scheme={colors["lavender"]} />);
  const title = <h1 id="app-title">JS Kitty Cooking</h1>;
  expect(wrapper.contains(title)).toEqual(true);
  expect(wrapper.find(".btn")).toHaveLength(1);
  expect(wrapper.find(".btn").text()).toEqual("Random <FontAwesomeIcon />");
  expect(wrapper.exists("#cuisine")).toEqual(false);
});

it("makes navbar unfold and fold properly", () => {
  const wrapper = shallow(<NavBar setCuisines={() => {}} cuisines={cuisines} scheme={colors["lavender"]} />);
  wrapper.find("#nav-bar").simulate("click");
  const instruction_1 = <div className="msg instruction-unfolded-msg">Click cuisines to select/unselect them, click the bar again to close it.</div>;
  expect(wrapper.contains(instruction_1)).toEqual(true);
  const e = { stopPropagation: jest.fn() };
  wrapper.find(".cuisine-msg").at(0).props().onClick(e); 
  expect(wrapper.contains(instruction_1)).toEqual(true); //clicking a cuisine doesn't fold navbar
  wrapper.find("#nav-bar-unfolded").simulate("click");
  const instruction_2 = <div className="msg instruction-msg">Click to select cuisines</div>;
  expect(wrapper.contains(instruction_2)).toEqual(true);
});

it("makes clicking a cuisine change its background color", () => {
  const wrapper = mount(<App />);
  wrapper.find("#nav-bar").simulate("click");
  wrapper.find(".cuisine-msg").at(0).simulate("click");
  expect(wrapper.find(".cuisine-msg").get(0).props.style).toHaveProperty("backgroundColor", "#ddddf8");
  wrapper.find(".cuisine-msg").at(0).simulate("click"); //clicking it again changes it again
  expect(wrapper.find(".cuisine-msg").get(0).props.style).toHaveProperty("backgroundColor", "#aeafc2");
});

it("makes color schemes to change properly", () => {
  const wrapper = mount(<App />);
  wrapper.find("#pink").simulate("click");
  expect(wrapper.find("#output").get(0).props.style).toHaveProperty("backgroundColor", "#ffe3f4");
});

it("renders output properly with a mock-up dish", () => {
  const wrapper = shallow(<Output dish={dish} scheme={colors["lavender"]} />);
  const title = <h1 id="app-title">JS Kitty Cooking</h1>;
  expect(wrapper.contains(title)).toEqual(false);
  expect(wrapper.find(".btn")).toHaveLength(2);
  expect(wrapper.find(".btn").at(0).text()).toEqual("Random <FontAwesomeIcon />");
  expect(wrapper.find(".btn").at(1).text()).toEqual("Clear <FontAwesomeIcon />");
  expect(wrapper.exists("#cuisine")).toEqual(true);
  expect(wrapper.find("#cuisine").text()).toEqual("Cuisine: Vegetarian");
  expect(wrapper.contains("Potato Pie")).toEqual(true);
});

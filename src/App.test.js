import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import NavBar from "./NavBar";
import Input from "./Input";
import Output from "./Output";
import colors from "./colors.js";
import puppeteer from 'puppeteer';
//unit tests can be tested solo, end to end tests need to have the app running

describe('Unit Tests', () => {

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

});

describe('End-to-End Tests', () => { //it gives some warnings but passes, no beforeAll because it glitches

  test("loading, looking for dishes, 'random' and 'clear' buttons, switching the theme", async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    
    await page.waitForSelector("#app-title");
    const title = await page.$eval("#app-title", element => element.innerHTML);
    expect(title).toBe("JS Kitty Cooking"); //the page has loaded
    
    await page.waitForSelector("#search");
    await page.type('[id="search"]', "oys");
    await page.waitForSelector(".suggestion");
    const suggestion = await page.evaluate(() => {
      const element = document.getElementsByClassName('suggestion')[0];
      element.click(); //to get a recipe loaded
      return element.textContent; //to check how suggestions have loaded
    });
    expect(suggestion).toBe("Mock Oysters Of Green Corn"); //suggestions have loaded (the exact string works for the current db)
    await page.waitForSelector("#dish-title");
    const dish_name = await page.$eval("#dish-title", element => element.innerHTML);
    expect(dish_name).toBe("Mock Oysters Of Green Corn"); //the dish recipe has loaded on click too
   
    await page.waitForSelector(".btn");
    await page.evaluate(() => {
      const element = document.getElementsByClassName('btn')[1];
      element.click();
    });
    await page.waitForSelector("#app-title");
    const title_again = await page.$eval("#app-title", element => element.innerHTML);
    expect(title_again).toBe("JS Kitty Cooking"); //the dish recipe was cleared with the "clear" button and we got the welcome screen again
    
    await page.waitForSelector("#green");
    await page.$eval("#green", element => element.click());
    await page.waitForSelector("#output");
    const backgroundColor = await page.$eval("#output", e => window.getComputedStyle(e).backgroundColor);
    expect(backgroundColor).toBe("rgb(223, 248, 213)"); //switched the theme to green
    
    await page.waitForSelector(".btn");
    await page.$eval(".btn", element => element.click());
    await page.waitForSelector("#dish-title");
    const dish_name_again = await page.$eval("#dish-title", e => e.innerHTML);
    expect(typeof dish_name_again).toBe("string"); //got a random recipe pressing the "random" button
    
    browser.close();
  }, 60000);

});

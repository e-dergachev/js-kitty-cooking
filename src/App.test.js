import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';
import Input from './Input';
import Output from './Output';
import colors from './colors.js';

const cuisines = {General: true, Vegetarian: true, American: true, French: true, Indian: true, Italian: true, Jewish: true};

it('renders navbar properly', () => {
  const wrapper = shallow(<NavBar cuisines={cuisines} scheme={colors["lavender"]} />);
  const instruction = <div className="msg instruction-msg">Click to select cuisines</div>;
  expect(wrapper.contains(instruction)).toEqual(true);
});

it('renders input properly', () => {
  const wrapper = shallow(<Input cuisines={cuisines} scheme={colors["lavender"]} />);
  expect(wrapper.exists('input')).toEqual(true);
});

it('renders output properly', () => {
  const wrapper = shallow(<Output dish={[]} scheme={colors["lavender"]} />);
  const title = <h1 id="app-title">JS Kitty Cooking</h1>;
  expect(wrapper.contains(title)).toEqual(true);
});

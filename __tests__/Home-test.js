import React from 'react';
import renderer from 'react-test-renderer';
// import Intro from '../Intro';
import LoginScreen from '../src/screen/login';

test('renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
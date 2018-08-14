import React from 'react';
import FindByEmail from './FindByEmail.react.js';
import TestRenderer from 'react-test-renderer';


test('FindByEmail render correctly',()=>{
  const loginUser = {
    email : 'abc@efg.com',
  }
  const renderer = TestRenderer.create(<FindByEmail loginUser={loginUser}/>);
  const tree = renderer.toJSON();
  expect(tree).toMatchSnapshot();
});


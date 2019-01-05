import React from "react";
import renderer from "react-test-renderer";

import AlertItem from "../alertItem";

test("AlertItem can display count and isImportant of true", () => {
  const component = renderer.create(<AlertItem count={3} isImportant={true} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("AlertItem can display count and isImportant of false", () => {
  const component = renderer.create(
    <AlertItem count={4} isImportant={false} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

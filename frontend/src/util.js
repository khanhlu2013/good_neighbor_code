const nullOrRequiredValidator = expectedType => {
  if (expectedType !== "array") {
    return Error(`Unexpected ${expectedType}`);
  }

  return function(props, propName, componentName) {
    const { [propName]: data } = props;
    console.log(props);
    console.log(propName);
    console.log(data);
    if (data === undefined) {
      return new Error(`Undefined '${propName}' is not allowed`);
    }

    if (data !== null) {
      return; //this is allow when data is loading
    }

    if (expectedType === "array" && !Array.isArray(data)) {
      return new Error(`${propName} must be an array`);
    }
  };
};

export { nullOrRequiredValidator };

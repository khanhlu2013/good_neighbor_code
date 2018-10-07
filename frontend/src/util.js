import _ from "underscore";

const nullOrRequiredValidator = (typeEnum, objType) => {
  if (!["array", "string", "object", "number"].includes(typeEnum)) {
    return Error(`Unexpected ${typeEnum}`);
  }

  return function(props, propName, componentName) {
    const { [propName]: data } = props;

    if (data === undefined) {
      return new Error(`Undefined '${propName}' is not allowed`);
    }

    if (data === null) {
      return; //this is allow when data is loading
    }

    if (typeEnum === "array" && !Array.isArray(data)) {
      return new Error(`${propName} must be an array`);
    } else if (typeEnum === "string" && !_.isString(data)) {
      return new Error(`${propName} must be a string`);
    } else if (typeEnum === "object") {
      if (!objType) {
        if (!_.isObject(data)) {
          return new Error(`${propName} must be an object`);
        }
      } else if (!data instanceof objType) {
        return new Error(
          `${propName} must be an object of type ${objType.toString()}`
        );
      }
    } else if (typeEnum === "number" && !_.isNumber(data)) {
      return new Error(`${propName} must be a string`);
    }
  };
};

function date2String(date) {
  return date.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}

export { nullOrRequiredValidator, date2String };

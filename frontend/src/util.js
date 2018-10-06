import React, { Component } from "react";
import _ from "underscore";
import className from "classnames";

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

class LoadingIcon extends Component {
  state = {
    curAnimateDotCount: 0,
    animateInterval: null
  };
  static get animateDotCountMax() {
    return 3;
  }
  componentDidMount() {
    this.startAnimate();
  }

  componentWillUnmount() {
    const { animateInterval } = this.state;
    if (animateInterval) {
      clearInterval(animateInterval);
    }
  }

  startAnimate() {
    const animateInterval = setInterval(() => {
      this.setState((state, props) => {
        const nextAnimateDot =
          (state.curAnimateDotCount + 1) % LoadingIcon.animateDotCountMax;
        return { curAnimateDotCount: nextAnimateDot };
      });
    }, 150);

    this.setState({ animateInterval });
  }

  getAnimateString() {
    const { curAnimateDotCount } = this.state;
    let array = new Array(LoadingIcon.animateDotCountMax);
    for (let index of array.keys()) {
      if (index === curAnimateDotCount) {
        array[index] = "\u00B7";
      } else {
        array[index] = ".";
      }
    }

    return array.join("");
  }

  render() {
    const { text } = this.props;
    const animateString = this.getAnimateString();
    return (
      <span id="LoadingIcon-react">
        {text !== null && text}
        <b>{animateString}</b>
      </span>
    );
  }
}

LoadingIcon.propTypes = {
  text: nullOrRequiredValidator("string")
};

function date2String(date) {
  return date.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
function computeNotificationCountHtml(count, isImportant = true) {
  let html = null;
  if (count !== null && count !== 0) {
    html = (
      <span
        className={className({
          "text-white": isImportant,
          "bg-danger": isImportant,
          "text-dark": !isImportant
          // "bg-light": !isImportant
        })}
      >{`(${count})`}</span>
    );
  } else if (count === null) {
    html = <LoadingIcon text={null} />;
  } else {
    if (count !== 0) throw Error("Unexpected code path");
  }
  return html;
}

export {
  nullOrRequiredValidator,
  LoadingIcon,
  date2String,
  computeNotificationCountHtml
};

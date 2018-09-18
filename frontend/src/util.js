import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "underscore";

const nullOrRequiredValidator = type => {
  if (!["array", "string", "object"].includes(type)) {
    return Error(`Unexpected ${type}`);
  }

  return function(props, propName, componentName) {
    const { [propName]: data } = props;

    if (data === undefined) {
      return new Error(`Undefined '${propName}' is not allowed`);
    }

    if (data === null) {
      return; //this is allow when data is loading
    }

    if (type === "array" && !Array.isArray(data)) {
      return new Error(`${propName} must be an array`);
    } else if (type === "string" && !_.isString(data)) {
      return new Error(`${propName} must be a string`);
    } else if (type === "object" && !_.isObject(data)) {
      return new Error(`${propName} must be an object`);
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
    if (this.props.isAnimate) {
      this.startAnimate();
    }
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
    if (!this.props.isAnimate) {
      return null;
    }

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
        {animateString !== null && <b>{animateString}</b>}
      </span>
    );
  }
}

LoadingIcon.propTypes = {
  text: nullOrRequiredValidator("string"),
  isAnimate: PropTypes.bool.isRequired
};

export { nullOrRequiredValidator, LoadingIcon };

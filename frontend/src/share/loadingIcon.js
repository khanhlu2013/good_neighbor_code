import React, { Component } from "react";
import { nullOrRequiredValidator } from "../util";

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

export default LoadingIcon;

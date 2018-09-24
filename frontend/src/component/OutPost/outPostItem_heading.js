import React from "react";
import PropTypes from "prop-types";
import { date2String } from "../../util";

function OutPostItemHeading(props) {
  const { dateCreate } = props;
  return (
    <div className="in-post-item-heading">
      <div className="container-fluid">
        <div className="text-secondary font-weight-light text-right">
          {`post on: ${date2String(dateCreate)}`}
        </div>
      </div>
    </div>
  );
}
OutPostItemHeading.propTypes = {
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export { OutPostItemHeading };

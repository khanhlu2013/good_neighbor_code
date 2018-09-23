import React from "react";
import PropTypes from "prop-types";
import { date2String } from "../../util";

function InPostItemHeading(props) {
  const { postUser, dateCreated } = props;
  return (
    <div className="in-post-item-heading">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <span className="text-primary font-weight-bold">
              {postUser.name}
            </span>
            <span className="text-secondary font-weight-light">
              {` ${postUser.email}`}
            </span>
          </div>
          <div className="col-sm text-secondary font-weight-light text-right">
            {date2String(dateCreated)}
          </div>
        </div>
      </div>
    </div>
  );
}
InPostItemHeading.propTypes = {
  postUser: PropTypes.object.isRequired,
  dateCreated: PropTypes.instanceOf(Date).isRequired
};

export { InPostItemHeading };

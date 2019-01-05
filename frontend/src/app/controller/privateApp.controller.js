import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppTabEnum from "../appTabEnum";

import selectAppTab from "@gn/common/app/selector/selectAppTab.selector";

function _(props) {
  const { selectAppTab, view } = props;
  return view(selectAppTab);
}
_.propTypes = {
  view: PropTypes.func.isRequired,
  selectAppTab: PropTypes.instanceOf(AppTabEnum).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  selectAppTab: selectAppTab(state)
});
const PrivateAppController = connect(mapStateToProps)(_);
export default PrivateAppController;

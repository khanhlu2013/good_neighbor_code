import { CHANGE_APP_TAB } from "../action/selectAppTab.action";
import AppTabEnum from "../appTabEnum";
import { RECEIVE_LOGGED_OUT_SUCCESS } from "@gn/common/app/action/auth.action";

const selectAppTabReducer = (state = AppTabEnum.INPOST, action) => {
  switch (action.type) {
    case CHANGE_APP_TAB:
      return action.appTab;

    case RECEIVE_LOGGED_OUT_SUCCESS:
      return AppTabEnum.INPOST;

    default:
      return state;
  }
};

export default selectAppTabReducer;

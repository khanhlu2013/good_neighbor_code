import { CHANGE_APP_TAB } from "../action/selectAppTab.action";
import AppTabEnum from "../component/appTabEnum";

const selectAppTabReducer = (state = AppTabEnum.INPOST, action) => {
  switch (action.type) {
    case CHANGE_APP_TAB:
      return action.appTab;

    default:
      return state;
  }
};

export default selectAppTabReducer;

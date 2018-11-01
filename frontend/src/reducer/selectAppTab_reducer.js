import { CHANGE_APP_TAB } from "../action/selectAppTab_action";
import AppTabEnum from "../app/appTabEnum";

const selectAppTabReducer = (state = AppTabEnum.INPOST, action) => {
  switch (action.type) {
    case CHANGE_APP_TAB:
      return action.appTab;

    default:
      return state;
  }
};

export default selectAppTabReducer;

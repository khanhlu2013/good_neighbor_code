import { tab_generator } from "./tab_generator";

const InPostTab = {
  ...tab_generator("tabSelector_inPost"),
  all: { ...tab_generator("tabSelector_inPost_all") },
  waitingList: { ...tab_generator("tabSelector_inPost_waitingList") },
  approve: { ...tab_generator("tabSelector_inPost_approve") },
  borrow: { ...tab_generator("tabSelector_inPost_borrow") },
  history: { ...tab_generator("tabSelector_inPost_history") }
};

export { InPostTab };

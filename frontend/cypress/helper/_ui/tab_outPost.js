import { tab_generator } from "./tab_generator";

const OutPostTab = {
  ...tab_generator("tabSelector_outPost"),
  all: { ...tab_generator("tabSelector_outPost_all") },
  waitingList: { ...tab_generator("tabSelector_outPost_waitingList") },
  borrow: { ...tab_generator("tabSelector_outPost_borrow") },
  return: { ...tab_generator("tabSelector_outPost_returnNote") },
  history: { ...tab_generator("tabSelector_outPost_history") }
};

export { OutPostTab };

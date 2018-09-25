import { InPostTab } from "./tab_inPost";
import { OutPostTab } from "./tab_outPost";
import { tab_generator } from "./tab_generator";

const tab = {
  inPost: InPostTab,
  outPost: OutPostTab,
  connection: { ...tab_generator("tabSelector_connection") }
};

export { tab };

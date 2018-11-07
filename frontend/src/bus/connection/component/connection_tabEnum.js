import { Enum } from "enumify";

class ConnectionTabEnum extends Enum {}
ConnectionTabEnum.initEnum([
  "FRIEND",
  "OUT_CONNECTION",
  "IN_CONNECTION",
  "SEARCH",
  "DENY"
]);

export default ConnectionTabEnum;

import { Enum } from "enumify";

class ConnectionTabEnum extends Enum {}
ConnectionTabEnum.initEnum([
  "FRIEND",
  "MYREQUEST",
  "FRIENDREQUEST",
  "SEARCH",
  "DENY"
]);

export { ConnectionTabEnum };

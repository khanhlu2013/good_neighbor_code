import { Enum } from "enumify";

class OutPostTabEnum extends Enum {}
OutPostTabEnum.initEnum(["ALL", "REQUEST", "BORROW", "RETURN", "HISTORY"]);

export { OutPostTabEnum };

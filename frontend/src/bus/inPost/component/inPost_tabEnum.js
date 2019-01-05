import { Enum } from "enumify";

class InPostTabEnum extends Enum {}
InPostTabEnum.initEnum(["ALL", "REQUEST", "APPROVE", "BORROW", "HISTORY"]);

export default InPostTabEnum;

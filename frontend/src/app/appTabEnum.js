import { Enum } from "enumify";

class AppTabEnum extends Enum {}
AppTabEnum.initEnum(["INPOST", "OUTPOST", "CONNECTION", "PROFILE"]);

export { AppTabEnum };

import { ObjectID } from "mongodb";
import { User } from "../../src/model/user";
import { Connection } from "../../src/model/connection";

const createUser = (name, email) => {
  const id = new ObjectID();
  return new User(id.toHexString(), email, name);
};

const createConnection = (from, to, isApproveByFrom, isApproveByTo) => {
  const id = new ObjectID();
  return new Connection(
    id.toHexString(),
    from,
    to,
    isApproveByTo,
    isApproveByFrom
  );
};

export { createUser, createConnection };

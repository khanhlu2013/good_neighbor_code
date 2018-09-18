import { Connection } from "../model/connection";
import { User } from "../model/user";

const constructConnectionFromRaw = raw => {
  const {
    _id: id,
    from: { _id: fromID, email: fromEmail, name: fromName },
    to: { _id: toID, email: toEmail, name: toName },
    approvedByTo,
    approvedByFrom
  } = raw;

  const from = new User(fromID, fromEmail, fromName);
  const to = new User(toID, toEmail, toName);
  return new Connection(id, from, to, approvedByTo, approvedByFrom);
};

const constructConnectionsFromRaws = raws => {
  return raws.map(raw => constructConnectionFromRaw(raw));
};

export { constructConnectionsFromRaws, constructConnectionFromRaw };

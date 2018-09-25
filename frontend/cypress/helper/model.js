import { ObjectID } from "mongodb";
import { User } from "../../src/model/user";
import { Connection } from "../../src/model/connection";
import { Post } from "../../src/model/post";
import { Share } from "../../src/model/share";

const createUser = (name, email) =>
  new User(new ObjectID().toHexString(), email, name);

const createConnection = (from, to, isApproveByFrom, isApproveByTo) =>
  new Connection(
    new ObjectID().toHexString(),
    from,
    to,
    isApproveByFrom,
    isApproveByTo
  );

const createPost = (user, title, description, isActive = true) =>
  new Post(
    new ObjectID().toHexString(),
    user,
    isActive,
    title,
    description,
    new Date(), //dateCreate
    []
  );

const createShare = (
  post,
  borrower,
  isApprove = undefined,
  isAwareApprove = false,
  isReturn = false,
  isAwareReturn = false,
  dateReturn = null
) =>
  new Share(
    new ObjectID().toHexString(),
    borrower,
    new Date(), //dateCreate
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn,
    dateReturn,
    post
  );

export { createUser, createConnection, createPost, createShare };

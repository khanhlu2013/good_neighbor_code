import { Connection } from "../model/connection";
import { User } from "../model/user";
import { Post } from "../model/post";
import { Share } from "../model/share";

const rawToConnection = raw => {
  const {
    _id: id,
    from: { _id: fromID, email: fromEmail, name: fromName },
    to: { _id: toID, email: toEmail, name: toName },
    isApproveByTo,
    isApproveByFrom
  } = raw;

  const from = new User(fromID, fromEmail, fromName);
  const to = new User(toID, toEmail, toName);
  return new Connection(id, from, to, isApproveByFrom, isApproveByTo);
};

const rawsToConnections = raws => {
  return raws.map(raw => rawToConnection(raw));
};

function rawsToPosts(raws) {
  return raws.map(raw => {
    const { post: postRaw, user: userRaw } = raw;
    const sharesRaw = raw.shares.filter(share => share._id !== undefined);

    const shares = sharesRaw.map(shareRaw => {
      const { _id: userId, email, name } = shareRaw.borrower;
      const borrower = new User(userId, email, name);
      return new Share(
        shareRaw._id,
        borrower,
        new Date(shareRaw.dateCreate),
        shareRaw.isApprove,
        shareRaw.isAwareApprove,
        shareRaw.isReturn,
        shareRaw.isAwareReturn,
        shareRaw.dateReturn === null ? null : new Date(shareRaw.dateReturn),
        null //post to be set later
      );
    });
    const { _id: userId, email: userEmail, name: userName } = userRaw;
    const post = new Post(
      postRaw._id,
      new User(userId, userEmail, userName),
      postRaw.isActive,
      postRaw.title,
      postRaw.description,
      new Date(postRaw.dateCreate),
      shares
    );
    for (const share of post.shares) {
      share.setPost(post);
    }
    return post;
  });
}

function rawToUser(raw) {
  const { _id: id, email, name } = raw;
  return new User(id, email, name);
}

export { rawsToConnections, rawToConnection, rawsToPosts, rawToUser };

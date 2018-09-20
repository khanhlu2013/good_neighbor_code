import { Connection } from "../model/connection";
import { User } from "../model/user";
import { Post } from "../model/post";
import { Share } from "../model/share";

const rawToConnection = raw => {
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
        shareRaw.dateCreated,
        shareRaw.isApprove,
        shareRaw.isAwareApprove,
        shareRaw.isReturn,
        shareRaw.isAwareReturn,
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
      postRaw.dateCreated,
      shares
    );
    for (const share of post.shares) {
      share.setPost(post);
    }
    return post;
  });
}

export { rawsToConnections, rawToConnection, rawsToPosts };

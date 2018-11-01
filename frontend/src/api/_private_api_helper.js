import { Connection } from "../model/connection";
import User from "../model/user";
import { Post } from "../model/post";
import { Share } from "../model/share";

const rawToConnection = raw => {
  const { _id: id, from, to, isApproveByTo, isApproveByFrom } = raw;

  return new Connection(
    id,
    rawToUser(from),
    rawToUser(to),
    isApproveByFrom,
    isApproveByTo
  );
};

const rawsToConnections = raws => {
  return raws.map(raw => rawToConnection(raw));
};

function rawsToPosts(raws) {
  return raws.map(raw => {
    const { post: postRaw, user: userRaw } = raw;
    const sharesRaw = raw.shares.filter(share => share._id !== undefined);

    const shares = sharesRaw.map(shareRaw => {
      return new Share(
        shareRaw._id,
        rawToUser(shareRaw.borrower),
        new Date(shareRaw.dateCreate),
        shareRaw.isApprove,
        shareRaw.isAwareApprove,
        shareRaw.isReturn,
        shareRaw.isAwareReturn,
        shareRaw.dateReturn === null ? null : new Date(shareRaw.dateReturn),
        null //post to be set later
      );
    });
    const post = new Post(
      postRaw._id,
      rawToUser(userRaw),
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
  const { _id: id, email, name, profileImageUrl } = raw;
  return new User(id, email, name, profileImageUrl);
}

export { rawsToConnections, rawToConnection, rawsToPosts, rawToUser };

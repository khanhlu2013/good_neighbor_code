export const friendConnectionFilter = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.isApproveByFrom &&
      connection.isApproveByTo &&
      (connection.to.id === loginUserId || connection.from.id === loginUserId)
  );

export const inConnectionFilter = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.to.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  );

export const outConnectionFilter = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.from.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  );

export const denyConnectionFilter = (connections, loginUserId) =>
  connections.filter(
    connection =>
      (connection.to.id === loginUserId &&
        connection.isApproveByTo === false) ||
      (connection.from.id === loginUserId &&
        connection.isApproveByFrom === false)
  );

const ConnectionFilter = {
  friend: friendConnectionFilter,
  in: inConnectionFilter,
  out: outConnectionFilter,
  deny: denyConnectionFilter
};

export default ConnectionFilter;

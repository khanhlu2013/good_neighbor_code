export const friendConnectionSelector = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.isApproveByFrom &&
      connection.isApproveByTo &&
      (connection.to.id === loginUserId || connection.from.id === loginUserId)
  );

export const inConnectionSelector = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.to.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  );

export const outConnectionSelector = (connections, loginUserId) =>
  connections.filter(
    connection =>
      connection.from.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  );

export const denyConnectionSelector = (connections, loginUserId) =>
  connections.filter(
    connection =>
      (connection.to.id === loginUserId &&
        connection.isApproveByTo === false) ||
      (connection.from.id === loginUserId &&
        connection.isApproveByFrom === false)
  );

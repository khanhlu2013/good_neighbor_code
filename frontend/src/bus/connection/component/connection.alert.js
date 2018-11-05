export const filterConnectionRequestAlert = (connections, loginUserId) => {
  if (!loginUserId) {
    return 0;
  }

  return connections.filter(
    connection =>
      connection.to.id === loginUserId &&
      connection.isApproveByFrom &&
      connection.isApproveByTo === undefined
  ).length;
};

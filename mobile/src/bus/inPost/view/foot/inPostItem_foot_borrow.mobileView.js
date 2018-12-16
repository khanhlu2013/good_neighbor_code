// import React from "react";
// import LoadingIcon from "../../../../share/loadingIcon";
// import InPostItemFootBorrowViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot_borrow.view.propType";

// function InPostItemFootBorrowWebView(props) {
//   const {
//     myBorrowShareId,
//     isAwareApproveBorrowShare,
//     isAwaringShare,
//     isReturningShare,
//     onAwareApprovePost,
//     onReturnPost
//   } = props;

//   const onAwareApprovePostClick = e => {
//     onAwareApprovePost(myBorrowShareId);
//   };
//   const onReturnPostClick = e => {
//     // this confirm need to be handle in unit test with jest, thus i am delay this
//     // if (
//     //   !window.confirm(`You are returning '${postTitle}'. This can not be undo!`)
//     // ) {
//     //   return;
//     // }
//     onReturnPost(myBorrowShareId);
//   };

//   let awareContent;
//   if (!isAwareApproveBorrowShare) {
//     if (isAwaringShare) {
//       awareContent = <LoadingIcon text={"aware approve"} />;
//     } else {
//       awareContent = (
//         <button
//           id="outPostItem-awareApproveBtn-react"
//           className="btn btn-sm btn-success"
//           onClick={onAwareApprovePostClick}
//         >
//           confirm approved
//         </button>
//       );
//     }
//   } else {
//     awareContent = <span>You've received.</span>;
//   }
//   let returnContent;
//   if (isReturningShare) {
//     returnContent = <LoadingIcon text={"return"} />;
//   } else {
//     returnContent = (
//       <button
//         id="outPostItem-returnBtn-react"
//         className="btn btn-sm btn-warning ml-1"
//         onClick={onReturnPostClick}
//       >
//         return item
//       </button>
//     );
//   }
//   return (
//     <div className="text-success">
//       {"request approved."}
//       <span className="ml-1">{awareContent}</span>
//       {returnContent}
//     </div>
//   );
// }

// InPostItemFootBorrowWebView.propTypes = InPostItemFootBorrowViewPropType;
// export default InPostItemFootBorrowWebView;

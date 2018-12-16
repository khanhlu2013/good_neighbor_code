// import React from "react";
// import LoadingIcon from "../../../../share/loadingIcon";
// import InPostItemFootRequestViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot_request.view.propType";

// function InPostItemFootRequestWebView(props) {
//   const { myRequestShareId, isUnRequestingPost, onUnRequestPost } = props;

//   const handleUndoRequest = e => {
//     onUnRequestPost(myRequestShareId);
//   };

//   let content;
//   if (isUnRequestingPost) {
//     content = <LoadingIcon text="undo" />;
//   } else {
//     content = (
//       <button
//         id="outPostItem-undoRequestBtn-react"
//         onClick={handleUndoRequest}
//         className="btn btn-warning"
//       >
//         undo
//       </button>
//     );
//   }

//   return (
//     <div className="text-success">
//       <span className="mr-1">you're in the waiting list.</span>
//       {content}
//     </div>
//   );
// }

// InPostItemFootRequestWebView.propTypes = InPostItemFootRequestViewPropType;

// export default InPostItemFootRequestWebView;

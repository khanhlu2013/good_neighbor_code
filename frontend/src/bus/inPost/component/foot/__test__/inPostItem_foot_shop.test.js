import React from "react";
import { shallow } from "enzyme";

import InPostItemFootShop from "../inPostItem_foot_shop";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_shop", () => {
  it("render correctly when isRequestingPost is true", () => {
    const postId = "1";
    const onRequestPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={true}
        onRequestPost={onRequestPost}
      />
    );
    expect(wrap).toMatchSnapshot();
    expect(wrap.find(LoadingIcon)).toHaveLength(1);
    expect(wrap.find("button")).toHaveLength(0);
  });

  it("render correctly when isRequestingPost is false", () => {
    const postId = "1";
    const onRequestPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={false}
        onRequestPost={onRequestPost}
      />
    );
    expect(wrap).toMatchSnapshot();
    expect(wrap.find(LoadingIcon)).toHaveLength(0);
    expect(wrap.find("button")).toHaveLength(1);
  });

  it("trigger onRequestPost callback when request btn is clicked", () => {
    const postId = "1";
    const onRequestPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={false}
        onRequestPost={onRequestPost}
      />
    );
    wrap.find("#outPostItem-requestBtn-react").simulate("click");
    expect(onRequestPost.mock.calls.length).toBe(1);
    expect(onRequestPost.mock.calls[0][0]).toBe("1");
  });
});

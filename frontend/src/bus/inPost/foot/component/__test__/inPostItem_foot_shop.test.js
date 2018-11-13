import React from "react";
import { shallow } from "enzyme";

import InPostItemFootShop from "../inPostItem_foot_shop";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_shop", () => {
  describe("loading icon", () => {
    it("show during requesting post", () => {
      const postId = "1";
      const requestPostHandler = jest.fn();

      const wrap = shallow(
        <InPostItemFootShop
          postId={postId}
          isRequestingPost={true}
          requestPostHandler={requestPostHandler}
        />
      );
      expect(wrap).toMatchSnapshot();
      expect(wrap.find(LoadingIcon)).toHaveLength(1);
      expect(wrap.find("button")).toHaveLength(0);
    });

    it("not show when not requesting post", () => {
      const postId = "1";
      const requestPostHandler = jest.fn();

      const wrap = shallow(
        <InPostItemFootShop
          postId={postId}
          isRequestingPost={false}
          requestPostHandler={requestPostHandler}
        />
      );
      expect(wrap).toMatchSnapshot();
      expect(wrap.find(LoadingIcon)).toHaveLength(0);
      expect(wrap.find("button")).toHaveLength(1);
    });
  });

  it("trigger requestPostHandler callback when request btn is clicked", () => {
    const postId = "1";
    const requestPostHandler = jest.fn();

    const wrap = shallow(
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={false}
        requestPostHandler={requestPostHandler}
      />
    );
    wrap.find("#outPostItem-requestBtn-react").simulate("click");
    expect(requestPostHandler.mock.calls.length).toBe(1);
    expect(requestPostHandler.mock.calls[0][0]).toBe("1");
  });
});

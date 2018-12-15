import React from "react";
import { shallow } from "enzyme";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_request", () => {
  describe("loading icon", () => {
    it("show during unRequesting post", () => {
      const wrap = shallow(
        <InPostItemFootRequestWebView
          myRequestShareId="1"
          isUnRequestingPost={true}
          onUnRequestPost={jest.fn()}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("undo");
    });

    it("not show when not unRequesting post", () => {
      const wrap = shallow(
        <InPostItemFootRequestWebView
          myRequestShareId="1"
          isUnRequestingPost={false}
          onUnRequestPost={jest.fn()}
        />
      );
      expect(wrap.find(LoadingIcon)).toHaveLength(0);
    });
  });

  it("to call onUnRequestPost correctly", () => {
    const shareId = "shareIdStr";
    const onUnRequestPost = jest.fn();

    const wrap = shallow(
      <InPostItemFootRequestWebView
        myRequestShareId={shareId}
        isUnRequestingPost={false}
        onUnRequestPost={onUnRequestPost}
      />
    );
    wrap.find("#outPostItem-undoRequestBtn-react").simulate("click");
    expect(onUnRequestPost.mock.calls).toHaveLength(1);
    expect(onUnRequestPost.mock.calls[0][0]).toBe(shareId);
  });

  it("to match snapshot", () => {
    const wrap = shallow(
      <InPostItemFootRequestWebView
        myRequestShareId="1"
        isUnRequestingPost={false}
        onUnRequestPost={jest.fn()}
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});

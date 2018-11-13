import React from "react";
import { shallow } from "enzyme";
import InPostItemFootRequest from "../inPostItem_foot_request";
import LoadingIcon from "../../../../../share/loadingIcon";

describe("inPostItem_foot_request", () => {
  describe("loading icon", () => {
    it("show during unRequesting post", () => {
      const wrap = shallow(
        <InPostItemFootRequest
          myRequestShareId="1"
          isUnRequestingPost={true}
          unRequestPostHandler={jest.fn()}
        />
      );
      expect(wrap.find(LoadingIcon).props().text).toBe("undo");
    });

    it("not show when not unRequesting post", () => {
      const wrap = shallow(
        <InPostItemFootRequest
          myRequestShareId="1"
          isUnRequestingPost={false}
          unRequestPostHandler={jest.fn()}
        />
      );
      expect(wrap.find(LoadingIcon)).toHaveLength(0);
    });
  });

  it("to call unRequestPostHandler correctly", () => {
    const shareId = "shareIdStr";
    const unRequestPostHandler = jest.fn();

    const wrap = shallow(
      <InPostItemFootRequest
        myRequestShareId={shareId}
        isUnRequestingPost={false}
        unRequestPostHandler={unRequestPostHandler}
      />
    );
    wrap.find("#outPostItem-undoRequestBtn-react").simulate("click");
    expect(unRequestPostHandler.mock.calls).toHaveLength(1);
    expect(unRequestPostHandler.mock.calls[0][0]).toBe(shareId);
  });

  it("to match snapshot", () => {
    const wrap = shallow(
      <InPostItemFootRequest
        myRequestShareId="1"
        isUnRequestingPost={false}
        unRequestPostHandler={jest.fn()}
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});

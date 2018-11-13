import React from "react";
import { shallow } from "enzyme";
import InPostItemFoot from "../inPostItem_foot";

describe("inPostItem_foot", () => {
  it("render request post foot correctly", () => {
    const wrap = shallow(
      <InPostItemFoot
        postId="1"
        isActive={true}
        myBorrowShareId={null}
        myRequestShareId={"2"}
      />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render approve post foot correctly", () => {
    const wrap = shallow(
      <InPostItemFoot
        postId="1"
        isActive={true}
        myBorrowShareId={"3"}
        myRequestShareId={null}
      />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render non-request and non-approve and active post foot correctly", () => {});

  it("render non-request and non-approve and non-active post foot correctly", () => {});
});

import React from "react";
import { shallow } from "enzyme";
import InPostItemFoot from "../inPostItem_foot";
import InPostItemFootRequestContainer from "../../../container/foot/inPostItem_foot_request.con";
import InPostItemFootBorrowContainer from "../../../container/foot/inPostItem_foot_borrow.con";
import * as helper from "../../../container/foot/inPostItem_foot.selector";

jest.spyOn(helper, "__getRequestOrBorrowShare");

describe("inPostItem_foot", () => {
  it("render non-request and non-approve and non-active post foot correctly", () => {
    const wrap = shallow(
      <InPostItemFoot
        postId={"postIdStub"}
        myRequestShareId={null}
        myBorrowShareId={null}
        isActivePost={false}
      />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render non-request and non-approve and active post foot correctly", () => {
    const wrap = shallow(
      <InPostItemFoot
        postId={"postIdStub"}
        myRequestShareId={null}
        myBorrowShareId={null}
        isActivePost={true}
      />
    );
    expect(wrap).toMatchSnapshot();
  });

  it("render request post foot correctly", () => {
    const myRequestShareId = "5bed125a8c57346a4063160d";

    const wrap = shallow(
      <InPostItemFoot
        postId={"postIdStub"}
        myRequestShareId={myRequestShareId}
        myBorrowShareId={null}
        isActivePost={true}
      />
    );
    expect(wrap).toMatchSnapshot();
    expect(
      wrap.find(InPostItemFootRequestContainer).props().myRequestShareId
    ).toBe(myRequestShareId);
  });

  it("render approve post foot correctly", () => {
    const myBorrowShareId = "5bed125a8c57346a4063160d";

    const wrap = shallow(
      <InPostItemFoot
        postId={"postIdStub"}
        myRequestShareId={null}
        myBorrowShareId={myBorrowShareId}
        isActivePost={true}
      />
    );
    expect(wrap).toMatchSnapshot();
    expect(
      wrap.find(InPostItemFootBorrowContainer).props().myBorrowShareId
    ).toBe(myBorrowShareId);
  });
});

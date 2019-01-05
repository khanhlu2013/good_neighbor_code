import React from "react";
import { shallow, mount } from "enzyme";

import InPostTabBar from "../inPost_tabBar";
import InPostTabEnum from "../inPost_tabEnum";
import "../../../../configIcon";

describe("inPost_tabBar", () => {
  it("to trigger onTabChange callback handler correctly", () => {
    const onTabChange = jest.fn();
    const wrap = mount(
      <InPostTabBar
        selectTab={InPostTabEnum.ALL}
        onTabChange={onTabChange}
        allCount={0}
        requestCount={1}
        approveCount={2}
        borrowCount={3}
        historyCount={4}
      />
    );

    // expect(wrap).toMatchSnapshot();
    wrap.find("div#tabSelector-inPost-all-react").simulate("click");
    wrap.find("div#tabSelector-inPost-request-react").simulate("click");
    wrap.find("div#tabSelector-inPost-approve-react").simulate("click");
    wrap.find("div#tabSelector-inPost-borrow-react").simulate("click");
    wrap.find("div#tabSelector-inPost-history-react").simulate("click");

    expect(onTabChange.mock.calls.length).toBe(5);

    expect(onTabChange.mock.calls[0][0]).toBe(InPostTabEnum.ALL);
    expect(onTabChange.mock.calls[1][0]).toBe(InPostTabEnum.REQUEST);
    expect(onTabChange.mock.calls[2][0]).toBe(InPostTabEnum.APPROVE);
    expect(onTabChange.mock.calls[3][0]).toBe(InPostTabEnum.BORROW);
    expect(onTabChange.mock.calls[4][0]).toBe(InPostTabEnum.HISTORY);
  });

  it("to match snapshot", () => {
    const onTabChange = jest.fn();
    const wrap = shallow(
      <InPostTabBar
        selectTab={InPostTabEnum.ALL}
        onTabChange={onTabChange}
        allCount={0}
        requestCount={1}
        approveCount={2}
        borrowCount={3}
        historyCount={4}
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});

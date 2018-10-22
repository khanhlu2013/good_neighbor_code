import styled from "styled-components";

const TabPanelStyle = styled.div`
  display: ${props => (props.show ? "block" : "none")};
`;

export { TabPanelStyle };

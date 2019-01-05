import styled from "styled-components";

const TabPanel = styled.div`
  display: ${props => (props.show ? "block" : "none")};
`;

export default TabPanel;

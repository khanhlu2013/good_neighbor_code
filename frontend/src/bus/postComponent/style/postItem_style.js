import styled from "styled-components";
import { ShadowBoxMixin } from "../../../componentUi/style/shadowBox_style";

const PostItemStyle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  ${ShadowBoxMixin};
`;

export default PostItemStyle;

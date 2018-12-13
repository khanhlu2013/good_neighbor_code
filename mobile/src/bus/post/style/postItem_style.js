import styled from "styled-components";
import { ShadowBoxMixin } from "../../../common/style/shadowBox_style";

const PostItemStyle = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  ${ShadowBoxMixin};
`;

export default PostItemStyle;

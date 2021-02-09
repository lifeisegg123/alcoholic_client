import { Global, css } from "@emotion/react";
import reset from "emotion-reset";

const globalStyle = css`
  ${reset}
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;

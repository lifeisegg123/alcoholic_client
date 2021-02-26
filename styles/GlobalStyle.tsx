import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import theme from "styles/Theme";

const globalStyle = css`
  ${reset}
  body {
    top: 0;
    font-family: "NanumSquareRound", sans-serif;
  }
  h1 {
    font-size: ${theme.fontSize.title};
  }
  h2 {
    font-size: ${theme.fontSize.title2};
  }
  h3 {
    font-size: ${theme.fontSize.subTitle};
  }
  h4 {
    font-size: ${theme.fontSize.subTitle2};
  }
  p {
    font-size: ${theme.fontSize.body};
  }
`;
const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;

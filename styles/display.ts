import { css } from "@emotion/react";

export const flexRowCss = css`
  display: flex;
  align-items: center;
`;

export const flexColCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const horizontalMarginAuto = css`
  display: block;
  margin: 0 auto;
`;

export const desktopCss = (content: any) => css`
  @media screen and (min-width: 567px) {
    ${content}
  }
`;

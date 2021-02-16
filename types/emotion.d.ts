import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    spacing: {
      small: string;
      normal: string;
      big: string;
    };
    fontSize: {
      title: string;
      subTitle: string;
      body: string;
    };
    colors: {
      white: string;
      black: string;
      grey: string;
    };
  }
}

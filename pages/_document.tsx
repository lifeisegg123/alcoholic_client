import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="https://drinklikeafish.xyz/favicon.ico"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="주당 이선생" />
          <meta property="og:title" content="주당 이선생" />
          <meta name="description" content="술 정보 공유 및 리뷰 사이트" />
          <meta
            property="og:description"
            content="술 정보 공유 및 리뷰 사이트"
          />
          {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

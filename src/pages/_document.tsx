import Document, { Html, Head, Main, NextScript } from 'next/document'

// eslint-disable-next-line functional/no-class
class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Yantramanav:wght@300;400&display=swap'
            rel='stylesheet'
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

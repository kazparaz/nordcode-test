import Head from 'next/head'

export type DocumentHeadProps = { pageTitle: string }

export const DocumentHead = (props: DocumentHeadProps): JSX.Element => (
  <Head>
    <title>{props.pageTitle}</title>
    <link rel='icon' href='/favicon.ico' />
    <link
      href='https://fonts.googleapis.com/css2?family=Yantramanav:wght@300;400&display=swap'
      rel='stylesheet'
    />
  </Head>
)

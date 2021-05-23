import Head from 'next/head';
import { useRouter } from 'next/router';
import A12 from 'react-a12';

import Layout from '@components/Layout';
import useUser from '@hooks/useUser';

const App = (props) => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Next.js Example</title>
      </Head>
      <A12
        path={router.pathname}
        securedPathsPatterns={[/^\/.*$/i]}
        openPathsPatterns={[/^\/login$/i]}
        onUnauthorized={() => router.push('/login')}
        isAuthorized={!!user}
        isLoading={loading}
        loaderComponent={<h1>Loading...</h1>}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </A12>
    </>
  );
};

export default App;

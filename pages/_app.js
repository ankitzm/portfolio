import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async defer data-website-id="67617051-3806-4b5f-993f-57d03147c9ef" src="https://umami-production-6c51.up.railway.app/umami.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

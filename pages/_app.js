import '../styles/globals.css'
import Nav from '../src/components/nav';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-blue-200 h-screen flex flex-col justify-center items-center">
      <div className='fixed top-4'>
        <Nav />
      </div>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

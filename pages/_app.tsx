
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }) {
    console.log(Component);
    console.log(pageProps);
    return <>
    <div className='h-200 font-semibold text-red-200'>
        Guitar-Buddy
    </div>
    NavBar
    <Component {...pageProps} />
    </>
}
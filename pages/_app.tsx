import React from "react";
import {AppProps} from "next/app";

import "./header.css"
import "./footer.css"
import "./reset.css"

export default function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps}/>
}

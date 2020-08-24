import React from "react";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {ConstituentDocs} from "../Components/ConsistuentDocs/ConstituentDocs";

export default function ConstituentDocsPage() {
    return (
        <>
            <Layout title="Учредительные документы"/>
            <Navbar/>
            <div className="content">
                <Header/>
                <div className="container">
                    <h1 className="page__title text-center">Учредительные документы</h1>
                    <ConstituentDocs/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

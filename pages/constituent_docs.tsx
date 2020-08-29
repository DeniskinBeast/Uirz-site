import React, {Component} from "react";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DocsCards} from "../Components/DocsCards/DocsCards";

import {DocsCardData} from "../Types/DocsCardData";

interface ConstituentDocsPageState {
    docsCards: DocsCardData[]
}

export default class ConstituentDocsPage extends Component<ConstituentDocsPageState> {
    state: ConstituentDocsPageState = {
        docsCards: []
    };

    fetchConstituentDocs = (): void => {
        fetch("/api/v1/constituent_docs")
            .then(response => response.json())
            .then(docsCards => this.setState({docsCards}))
    };

    componentDidMount(): void {
        this.fetchConstituentDocs();
    }

    render(): React.ReactElement {
        const {docsCards} = this.state;

        return (
        <>
            <Layout title="Учредительные документы"/>
            <Navbar/>
            <div className="content">
                <Header/>
                <div className="container">
                    <h1 className="page__title text-center">Учредительные документы</h1>
                    <DocsCards docsCards={docsCards}/>
                </div>
            </div>
            <Footer/>
        </>
        )
    }
}

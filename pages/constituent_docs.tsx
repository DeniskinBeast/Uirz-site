import React, {Component} from "react";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {LoadingComponent} from "../Components/Loading";

import {DocsCardData} from "../Types/DocsCardData";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface ConstituentDocsPageState {
    docsCards: DocsCardData[],
    error: boolean,
    errorMessage: string
}

export default class ConstituentDocsPage extends Component<ConstituentDocsPageState> {
    state: ConstituentDocsPageState = {
        docsCards: [],
        error: false,
        errorMessage: ""
    };

    fetchConstituentDocs = (): void => {
        fetch("/api/v1/constituent_docs")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(docsCards => this.setState({docsCards, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    componentDidMount(): void {
        this.fetchConstituentDocs();
    }

    render(): React.ReactElement {
        const {docsCards, error, errorMessage} = this.state;

        return (
        <>
            <Layout title="Учредительные документы"/>
            <Navbar/>
            <div className="content">
                <Header/>
                <div className="container">
                    <h1 className="page__title text-center">Учредительные документы</h1>
                    {(docsCards.length == 0 && !error) && <LoadingComponent/>}
                    {!error && <DocsCards docsCards={docsCards}/>}
                    {error && <ErrorComponent errorMessage={errorMessage}/>}
                </div>
            </div>
            <Footer/>
        </>
        )
    }
}

import React, {Component} from "react";

import {DocsCardData} from "../Types/DocsCardData";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {LoadingComponent} from "../Components/Loading";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface PublicationsPageState {
    publications: DocsCardData[],
    error: boolean,
    errorMessage: string
}

export default class PublicationsPage extends Component<PublicationsPageState> {
    state: PublicationsPageState = {
        publications: [],
        error: false,
        errorMessage: ""
    };

    fetchPublications = (): void => {
        fetch("/api/v1/publications")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(publications => this.setState({publications, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    componentDidMount(): void {
        this.fetchPublications();
    }

    divideByYear = (publications: DocsCardData[], year: number): DocsCardData[] => {
        return publications.filter(publication => publication.year == year);
    };

    render(): React.ReactElement {
        const {publications, error, errorMessage} = this.state;
        const publications2009 = this.divideByYear(publications, 2009);
        const publications2010 = this.divideByYear(publications, 2010);
        const publications2011 = this.divideByYear(publications, 2011);

        if (error)
            return (
                <>
                    <Layout title="Публикации"/>
                    <Navbar/>
                    <div className="content">
                        <Header/>
                        <ErrorComponent errorMessage={errorMessage}/>
                    </div>
                </>
            );

        return (
            <>
                <Layout title="Публикации"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Публикации</h1>
                        {publications.length == 0 && <LoadingComponent/>}
                        <h2 className="text-center page__title">2009 Год:</h2>
                        <DocsCards docsCards={publications2009}/>
                        <h2 className="text-center page__title">2010 Год:</h2>
                        <DocsCards docsCards={publications2010}/>
                        <h2 className="text-center page__title">2011 Год:</h2>
                        <DocsCards docsCards={publications2011}/>
                    </div>
                </div>
            </>
        );
    }
}

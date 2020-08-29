import React, {Component} from "react";

import {DocsCardData} from "../Types/DocsCardData";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {DocsCards} from "../Components/DocsCards/DocsCards";

interface PublicationsPageState {
    publications: DocsCardData[]
}

export default class PublicationsPage extends Component<PublicationsPageState> {
    state: PublicationsPageState = {
        publications: []
    };

    fetchPublications = (): void => {
        fetch("/api/v1/publications")
            .then(response => response.json())
            .then(publications => this.setState({publications}));
    };

    componentDidMount(): void {
        this.fetchPublications();
    }

    divideByYear = (publications: DocsCardData[], year: number): DocsCardData[] => {
        return publications.filter(publication => publication.year == year);
    };

    render(): React.ReactElement {
        const {publications} = this.state;
        const publications2009 = this.divideByYear(publications, 2009);
        const publications2010 = this.divideByYear(publications, 2010);
        const publications2011 = this.divideByYear(publications, 2011);

        return (
            <>
                <Layout title="Публикации"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Публикации</h1>
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

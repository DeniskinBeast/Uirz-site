import React, {Component} from "react";

import {DocsCardData} from "../Types/DocsCardData";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {LoadingComponent} from "../Components/Loading";

interface LegislationStatusPageState {
    statusReports: DocsCardData[]
}

export default class LegislationStatusPage extends Component<LegislationStatusPageState> {
    state: LegislationStatusPageState = {
        statusReports: []
    };

    fetchReports = (): void => {
        fetch("/api/v1/legislation_status_reports")
            .then(response => response.json())
            .then(statusReports => this.setState({statusReports}))
    };

    componentDidMount(): void {
        this.fetchReports();
    }

    render(): React.ReactElement {
        const {statusReports} = this.state;

        return (
            <>
                <Layout title="Доклады о состоянии законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Доклады о состоянии законодательства</h1>
                        {statusReports.length == 0 && <LoadingComponent/>}
                        <DocsCards docsCards={statusReports}/>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

import React, {Component} from "react";

import {DocsCardData} from "../Types/DocsCardData";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {LoadingComponent} from "../Components/Loading";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface LegislationStatusPageState {
    statusReports: DocsCardData[],
    error: boolean,
    errorMessage: string
}

export default class LegislationStatusPage extends Component<LegislationStatusPageState> {
    state: LegislationStatusPageState = {
        statusReports: [],
        error: false,
        errorMessage: ""
    };

    fetchReports = (): void => {
        fetch("/api/v1/legislation_status_reports")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(statusReports => this.setState({statusReports, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    componentDidMount(): void {
        this.fetchReports();
    }

    render(): React.ReactElement {
        const {statusReports, error, errorMessage} = this.state;

        return (
            <>
                <Layout title="Доклады о состоянии законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Доклады о состоянии законодательства</h1>
                        {(statusReports.length == 0 && !error) && <LoadingComponent/>}
                        {!error && <DocsCards docsCards={statusReports}/>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

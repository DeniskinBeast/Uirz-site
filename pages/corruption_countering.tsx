import React, {Component} from "react";

import {DocsCardData} from "../Types/DocsCardData";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {Footer} from "../Components/Footer";
import {LoadingComponent} from "../Components/Loading";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface CorruptionCounteringPageState {
    localActs: DocsCardData[],
    corruptionReports: DocsCardData[],
    error: boolean,
    errorMessage: string;
}

export default class CorruptionCounteringPage extends Component<CorruptionCounteringPageState> {
    state: CorruptionCounteringPageState = {
      localActs: [],
      corruptionReports: [],
        error: false,
        errorMessage: ""
    };

    fetchLocalActs = (): void => {
        fetch("/api/v1/corruption/local_acts")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(localActs => this.setState({localActs, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchCorruptionReports = (): void => {
        fetch("/api/v1/corruption/corruption_reports")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(corruptionReports => this.setState({corruptionReports, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    componentDidMount(): void {
        this.fetchLocalActs();
        this.fetchCorruptionReports();
    }

    render(): React.ReactElement {
        const {localActs, corruptionReports, error, errorMessage} = this.state;

        return (
            <>
                <Layout title="Противодействие коррупции"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Противодействие коррупции</h1>
                        <h2 className="text-center page__title">Локальные акты</h2>
                        {(localActs.length == 0 && !error) && <LoadingComponent/>}
                        {!error && <DocsCards docsCards={localActs}/>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                        <h2 className="text-center page__title">Отчетная информация</h2>
                        {(corruptionReports.length == 0 && !error) && <LoadingComponent/>}
                        {!error && <DocsCards docsCards={corruptionReports}/>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                        <p className="text-center"><strong>Телефон для сообщения информации о коррупционных проявлениях:</strong></p>
                        <p className="text-center"><strong>(343) 358-18-40</strong></p>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

import {Layout} from "../Components/Layout";
import React, {Component} from "react";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {DocsCardData} from "../Types/DocsCardData";
import {DocsCards} from "../Components/DocsCards/DocsCards";
import {Footer} from "../Components/Footer";

interface CorruptionCounteringPageState {
    localActs: DocsCardData[],
    corruptionReports: DocsCardData[];
}

export default class CorruptionCounteringPage extends Component<CorruptionCounteringPageState> {
    state: CorruptionCounteringPageState = {
      localActs: [],
      corruptionReports: []
    };

    fetchLocalActs = (): void => {
        fetch("/api/v1/corruption/local_acts")
            .then(response => response.json())
            .then(localActs => this.setState({localActs}))
    };

    fetchCorruptionReports = (): void => {
        fetch("/api/v1/corruption/corruption_reports")
            .then(response => response.json())
            .then(corruptionReports => this.setState({corruptionReports}))
    };

    componentDidMount(): void {
        this.fetchLocalActs();
        this.fetchCorruptionReports();
    }

    render(): React.ReactElement {
        const {localActs, corruptionReports} = this.state;

        return (
            <>
                <Layout title="Противодействие коррупции"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <div className="container">
                        <h1 className="text-center page__title">Противодействие коррупции</h1>
                        <h2 className="text-center page__title">Локальные акты</h2>
                        <DocsCards docsCards={localActs}/>
                        <h2 className="text-center page__title">Отчетная информация</h2>
                        <DocsCards docsCards={corruptionReports}/>
                        <p className="text-center"><strong>Телефон для сообщения информации о коррупционных проявлениях:</strong></p>
                        <p className="text-center"><strong>(343) 358-18-40</strong></p>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}
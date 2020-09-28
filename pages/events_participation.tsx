import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {UpButton} from "../Components/UpButton/UpButton";
import { LegislationMonitoringData } from "../Types/LegislationMonitoringData";
import { connectionErrorHandler, emptyContentErrorHandler } from "Handlers/errorHanlders";
import { NewsFilter } from "../Components/NewsFIlter/NewsFilter";
import ErrorComponent from "../Components/ErrorComponent";
import { LoadingComponent } from "../Components/Loading";
import { UpdateComponent } from "../Components/UpdateComponent";

interface EventsParticipationPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class EventsParticipation extends Component<EventsParticipationPageState> {
    state: EventsParticipationPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        isUpdating: false,
        error: false,
        errorMessage: ""
    }

    fetchLastReport = (): void => {
        fetch("/api/v1/eventsParticipationLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, isUpdating: false, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/eventsParticipationReportByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(report => this.setState({report, isUpdating: false, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    filterByYear = (year: number, _pageNumber: number): void => {
        this.setState({isUpdating: true, filteredYear: year});
        this.fetchReportByYear(year);
    };

    componentDidMount(): void {
        this.fetchLastReport();
    }

    render(): React.ReactElement {
        const {report, filteredYear, isUpdating, error, errorMessage} = this.state;

        const yearsFilterItems = [{itemValue: 2013, label: "2013"}, {itemValue: 2014, label: "2014"},
         {itemValue: 2015, label: "2015"}, {itemValue: 2016, label: "2016"}, {itemValue: 2017, label: "2017"}, {itemValue: 2018, label: "2018"}];
        
        return (
            <>
                <Layout title="Выступления и участие в мероприятиях"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <UpButton to="events_participation"/>
                    <h1 id="events_participation" className="text-center page__title">Выступления и участие в мероприятиях</h1>
                    <div className="container">
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
                        {filteredYear !== 0 && <h2 className="text-center page__title">{`${filteredYear} Год`}</h2>}
                        {(isUpdating && !error) && <UpdateComponent/>}
                        {(report.text.length === 0 && !error) && <LoadingComponent/>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                        {!error && ReactHtmlParser(report.text)}
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

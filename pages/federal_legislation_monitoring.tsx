import React, {Component} from "react";
import ReactHtmlParser from "react-html-parser";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {NewsFilter} from "../Components/NewsFIlter/NewsFilter";
import {LegislationMonitoringData} from "../Types/LegislationMonitoringData";
import {Footer} from "../Components/Footer";
import {LoadingComponent} from "../Components/Loading";
import {UpdateComponent} from "../Components/UpdateComponent";
import {resolveMonths} from "../Scripts/resovleMonths";
import {catchHandler, connectionErrorHandler, emptyContentErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface FederalLegislationMonitoringPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    filteredMonth: number,
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class FederalLegislationMonitoringPage extends Component<FederalLegislationMonitoringPageState> {
    state: FederalLegislationMonitoringPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        filteredMonth: 0,
        isUpdating: false,
        error: false,
        errorMessage: ""
    };

    fetchLastReport = (): void => {
        fetch("/api/v1/federalMonitoringLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, filteredMonth: report.month, isUpdating: false, error: false}))
            .catch(err => {
                this.setState({error: true, errorMessage: err.message});
                catchHandler(err);
            });
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/federalMonitoringReportByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(report => this.setState({report, filteredMonth: report.month, isUpdating: false, error: false}))
            .catch(err => {
                this.setState({error: true, errorMessage: err.message});
                catchHandler(err);
            });
    };

    fetchReportByMonth = (year: number, month: number): void => {
        fetch(`/api/v1/federalMonitoringReportByMonth/${year}/${month}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(report => this.setState({report, isUpdating: false, error: false}))
            .catch(err => {
                this.setState({error: true, errorMessage: err.message});
                catchHandler(err);
            });
    };

    filterByYear = (year: number, _pageNumber: number): void => {
        this.setState({isUpdating: true, filteredYear: year});
        this.fetchReportByYear(year);
    };

    filterByMonth = (month: number, _pageNumber: number): void => {
        this.setState({isUpdating: true, filteredMonth: month});
        this.fetchReportByMonth(this.state.filteredYear, month);
    };

    componentDidMount(): void {
        this.fetchLastReport();
    }

    render(): React.ReactElement {
        const {report, filteredYear, filteredMonth, isUpdating, error, errorMessage} = this.state;

        const monthsFilterItems = [{itemValue: 1, label: "Январь"}, {itemValue: 2, label: "Ферваль"},
            {itemValue: 3, label: "Март"}, {itemValue: 4, label: "Апрель"},
            {itemValue: 5, label: "Май"}, {itemValue: 6, label: "Июнь"}, {itemValue: 7, label: "Июль"},
            {itemValue: 8, label: "Август"}, {itemValue: 9, label: "Сентябрь"}, {itemValue: 10, label: "Октябрь"},
            {itemValue: 11, label: "Ноябрь"}, {itemValue: 12, label: "Декабрь"}];

        const yearsFilterItems = [{itemValue: 2010, label: "2010"}, {itemValue: 2009, label: "2009"}];

        return (
            <>
                <Layout title="Мониторинг федерального законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <h1 className="text-center page__title">Мониторинг федерального законодательства</h1>
                    <div className="container">
                        <div className="filters_container">
                            <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
                            <NewsFilter filterName="Фильтр по месяцам" fetchFunc={this.filterByMonth} filterItems={monthsFilterItems}/>
                        </div>
                        {(filteredYear !== 0 && filteredMonth !== 0) && <h2 className="text-center page__title">{`${filteredYear} Год ${resolveMonths(filteredMonth)}`}</h2>}
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

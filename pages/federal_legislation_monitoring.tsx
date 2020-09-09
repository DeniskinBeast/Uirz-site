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

interface FederalLegislationMonitoringPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    filteredMonth: number,
    isUpdating: boolean
}

export default class FederalLegislationMonitoringPage extends Component<FederalLegislationMonitoringPageState> {
    state: FederalLegislationMonitoringPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        filteredMonth: 0,
        isUpdating: false
    };

    fetchLastReport = (): void => {
        fetch("/api/v1/federalMonitoringLastReport")
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, filteredMonth: report.month, isUpdating: false}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/federalMonitoringReportByYear/${year}`)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, filteredMonth: report.month, isUpdating: false}));
    };

    fetchReportByMonth = (year: number, month: number): void => {
        fetch(`/api/v1/federalMonitoringReportByMonth/${year}/${month}`)
            .then(response => response.json())
            .then(report => this.setState({report, filteredMonth: report.month, isUpdating: false}));
    };

    filterByYear = (year: number, _pageNumber: number): void => {
        this.setState({isUpdating: true});
        console.log(year);
        this.fetchReportByYear(year);
    };

    filterByMonth = (month: number, _pageNumber: number): void => {
        this.setState({isUpdating: true});
        this.fetchReportByMonth(this.state.filteredYear, month);
    };

    componentDidMount(): void {
        this.fetchLastReport();
    }

    render(): React.ReactElement {
        const {report, filteredYear, filteredMonth, isUpdating} = this.state;

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
                        <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
                        <NewsFilter filterName="Фильтр по месяцам" fetchFunc={this.filterByMonth} filterItems={monthsFilterItems}/>
                        {(filteredYear !== 0 && filteredMonth !== 0) && <h2 className="text-center page__title">{`${filteredYear} Год ${filteredMonth}`}</h2>}
                        {isUpdating && <UpdateComponent/>}
                        {report.text.length === 0 && <LoadingComponent/>}
                        {ReactHtmlParser(report.text)}
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

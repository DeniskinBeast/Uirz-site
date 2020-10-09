import {LegislationMonitoringData} from "../../Types/LegislationMonitoringData";
import React, {Component} from "react";
import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {MonitoringSubNav} from "../../Components/MonitoringSubNav/MonitoringSubNav";
import {NewsFilter} from "../../Components/NewsFIlter/NewsFilter";
import {UpdateComponent} from "../../Components/UpdateComponent";
import {LoadingComponent} from "../../Components/Loading";
import ReactHtmlParser from "react-html-parser";
import {Footer} from "../../Components/Footer";
import ErrorComponent from "../../Components/ErrorComponent";
import {connectionErrorHandler, emptyContentErrorHandler} from "../../server/Handlers/errorHanlders";

interface GeneralDocumentsMonitoringPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    years: {year: number}[],
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class GeneralDocumentsMonitoringPage extends Component<GeneralDocumentsMonitoringPageState> {
    state: GeneralDocumentsMonitoringPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        years: [],
        isUpdating: false,
        error: false,
        errorMessage: ""
    };

    fetchYearsArrange = (): void => {
        fetch("/api/v1/generalDocumentsYears")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(years => this.setState({years: years}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchLastReport = (): void => {
        fetch("/api/v1/generalDocumentsMonitoringLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, isUpdating: false, error: false}))
            .catch(err => {
                this.setState({error: true, errorMessage: err.message});
            });
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/generalDocumentsMonitoringReportByYear/${year}`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(emptyContentErrorHandler)
            .then(report => this.setState({report, isUpdating: false, error: false}))
            .catch(err => {
                this.setState({error: true, errorMessage: err.message});
            });
    };

    filterByYear = (year: number, _pageNumber: number): void => {
        this.setState({isUpdating: true, filteredYear: year});
        this.fetchReportByYear(year);
    };

    componentDidMount(): void {
        this.fetchLastReport();
        this.fetchYearsArrange();
    }

    render(): React.ReactElement {
        const {report, filteredYear, years, isUpdating, error, errorMessage} = this.state;
        const subNavItems = [{label: "Общая информация", href: "/regional_legislation_monitoring/main", as: "/regional_legislation_monitoring/main"},
            {label: "Законы Свердловской области", href: "/regional_legislation_monitoring/regional_law", as: "/regional_legislation_monitoring/regional_law"},
            {label: "Указы губернатора", href: "/regional_legislation_monitoring/governor_decrees", as: "/regional_legislation_monitoring/governor_decrees"},
            {label: "Постановления правительства Свердловской области", href: "/regional_legislation_monitoring/government_decrees", as: "/regional_legislation_monitoring/government_decrees"},
            {label: "Нормативно-правовые акты исполнительных органов Свердловской области", href: "/regional_legislation_monitoring/general_documents", as: "/regional_legislation_monitoring/general_documents"}];

        const yearsFilterItems = years.map(year => Object({itemValue: year.year, label: year.year.toString()}));

        return (
            <>
                <Layout title="Мониторинг нормативно-правовых актов исполнительных органов Свердловской области"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <MonitoringSubNav subNavId="monitoringSubNav" subNavItems={subNavItems}/>
                    <h1 className="text-center page__title">Мониторинг нормативно-правовых актов исполнительных органов Свердловской области</h1>
                    <div className="container">
                        <div className="filters_container">
                            <NewsFilter filterName="Год" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
                        </div>
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

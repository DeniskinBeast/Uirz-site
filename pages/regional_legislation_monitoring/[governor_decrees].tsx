import {LegislationMonitoringData} from "../../Types/LegislationMonitoringData";
import React, {Component} from "react";
import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {NewsFilter} from "../../Components/NewsFIlter/NewsFilter";
import {resolveMonths} from "../../Scripts/resovleMonths";
import {UpdateComponent} from "../../Components/UpdateComponent";
import {LoadingComponent} from "../../Components/Loading";
import ReactHtmlParser from "react-html-parser";
import {Footer} from "../../Components/Footer";
import {MonitoringSubNav} from "../../Components/MonitoringSubNav/MonitoringSubNav";

interface GovernorDecreesMonitoringPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    filteredMonth: number,
    isUpdating: boolean
}

export default class GovernorDecreesMonitoringPage extends Component<GovernorDecreesMonitoringPageState> {
    state: GovernorDecreesMonitoringPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        filteredMonth: 0,
        isUpdating: false
    };

    fetchLastReport = (): void => {
        fetch("/api/v1/governorDecreesMonitoringLastReport")
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, filteredMonth: report.month, isUpdating: false}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/governorDecreesMonitoringReportByYear/${year}`)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, filteredMonth: report.month, isUpdating: false}));
    };

    fetchReportByMonth = (year: number, month: number): void => {
        fetch(`/api/v1/governorDecreesMonitoringReportByMonth/${year}/${month}`)
            .then(response => response.json())
            .then(report => this.setState({report, filteredMonth: report.month, isUpdating: false}));
    };

    filterByYear = (year: number, _pageNumber: number): void => {
        this.setState({isUpdating: true});
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
        const subNavItems = [{label: "Общая информация", href: "/regional_legislation_monitoring/[main]", as: "/regional_legislation_monitoring/main"},
            {label: "Законы Свердловской области", href: "/regional_legislation_monitoring/[regional_law]", as: "/regional_legislation_monitoring/regional_law"},
            {label: "Указы губернатора", href: "/regional_legislation_monitoring/[governor_decrees]", as: "/regional_legislation_monitoring/governor_decrees"},
            {label: "Постановления правительства Свердловской области", href: "/regional_legislation_monitoring/[government_decrees]", as: "/regional_legislation_monitoring/[government_decrees]"},
            {label: "Нормативно-правовые акты исполнительных органов Свердловской области", href: "/regional_legislation_monitoring/[general_documents]", as: "/regional_legislation_monitoring/general_documents"}];

        const monthsFilterItems = [{itemValue: 1, label: "Январь"}, {itemValue: 2, label: "Ферваль"},
            {itemValue: 3, label: "Март"}, {itemValue: 4, label: "Апрель"},
            {itemValue: 5, label: "Май"}, {itemValue: 6, label: "Июнь"}, {itemValue: 7, label: "Июль"},
            {itemValue: 8, label: "Август"}, {itemValue: 9, label: "Сентябрь"}, {itemValue: 10, label: "Октябрь"},
            {itemValue: 11, label: "Ноябрь"}, {itemValue: 12, label: "Декабрь"}];

        const yearsFilterItems = [{itemValue: 2010, label: "2010"}, {itemValue: 2009, label: "2009"}];

        return (
            <>
                <Layout title="Мониторинг указов Губернатора Свердловской области"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <MonitoringSubNav subNavId="monitoringSubNav" subNavItems={subNavItems}/>
                    <h1 className="text-center page__title">Мониторинг указов Губернатора Свердловской области</h1>
                    <div className="container">
                        <div className="filters_container">
                            <NewsFilter filterName="Фильтр по годам" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
                            <NewsFilter filterName="Фильтр по месяцам" fetchFunc={this.filterByMonth} filterItems={monthsFilterItems}/>
                        </div>
                        {(filteredYear !== 0 && filteredMonth !== 0) && <h2 className="text-center page__title">{`${filteredYear} Год ${resolveMonths(filteredMonth)}`}</h2>}
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

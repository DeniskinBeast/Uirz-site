import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {UpButton} from "../Components/UpButton/UpButton";
import { LegislationMonitoringData } from "../Types/LegislationMonitoringData";
import { connectionErrorHandler, emptyContentErrorHandler } from "Handlers/errorHanlders";
import { NewsFilter } from "../Components/NewsFIlter/NewsFilter";
import { UpdateComponent } from "../Components/UpdateComponent";
import { LoadingComponent } from "../Components/Loading";
import ErrorComponent from "../Components/ErrorComponent";

interface LegalExpertisePageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class LegalExpertisePage extends Component<LegalExpertisePageState> {
    state: LegalExpertisePageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        isUpdating: false,
        error: false,
        errorMessage: ""
    }

    fetchLastReport = (): void => {
        fetch("/api/v1/legalExpertiseLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, isUpdating: false, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/legalExpertiseReportByYear/${year}`)
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

        const yearsFilterItems = [{itemValue: 2010, label: "2010"}, {itemValue: 2011, label: "2011"}, {itemValue: 2012, label: "2012"}, {itemValue: 2013, label: "2013"}, {itemValue: 2014, label: "2014"},
         {itemValue: 2015, label: "2015"}, {itemValue: 2016, label: "2016"}, {itemValue: 2017, label: "2017"}, {itemValue: 2018, label: "2018"}, {itemValue: 2019, label: "2019"}];
        
        return (
            <>
                <Layout title="Правовая экспертиза нормативных правовых актов"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <UpButton to="legal_expertise"/>
                    <h1 id="legal_expertise" className="text-center page__title">Правовая экспертиза нормативных правовых актов</h1>
                    <div className="container">
                        <p>Институт проводит правовую экспертизу проектов нормативных правовых актов Свердловской области и иных
                            документов, выполнение которой осуществляют <Link href="/experts_council/main"><a> Экспертный
                                совет</a></Link> и <Link href="/structure" as="structure"><a>отдел разработки проектов нормативных
                                правовых актов</a></Link>.</p> <p>В соответствии с Уставом Института <Link href="/experts_council/main"><a> Экспертный
                        совет</a></Link> проводит экспертизу:</p>
                        <p>1) проектов законов Свердловской области, внесённых в порядке зако-нодательной инициативы в
                            Законодательное Собрание Свердловской области;</p>
                        <p>2) проектов законов Свердловской области, подготовленных для приня-тия на референдуме Свердловской
                            области;</p>
                        <p>3) проектов федеральных законов, подготовленных для рассмотрения в
                            Законодательном Собрании Свердловской области с целью направления их в
                            порядке законодательной инициативы в Государственную Думу Федерального
                            Собрания Российской Федерации;
                        </p>
                        <p>4) законов Свердловской области, на которые в Законодательное
                        Собрание Свердловской области направлены протесты заместителя
                        Генерального прокурора Российской Федерации, прокурора Свердловской
                        области или его заместителя.
                        </p>
                        <p>Результаты экспертизы правового акта отражаются в заключении <Link href="/experts_council/main"><a> Экспертного
                        совета</a></Link>, которое утверждается простым большинством голосов присутствующих на заседании членов
                        Экспертного совета. </p>
                        <p><strong>По результатам проведения правовой экспертизы в 2008 году Экспертным советом подготовлено 142
                            заключения, в 2009 году – 164. </strong></p>
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

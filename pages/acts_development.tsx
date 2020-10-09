import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import Link from "next/link";
import {UpButton} from "../Components/UpButton/UpButton";
import { LegislationMonitoringData } from "../Types/LegislationMonitoringData";
import { connectionErrorHandler, emptyContentErrorHandler } from "Handlers/errorHanlders";
import { NewsFilter } from "../Components/NewsFIlter/NewsFilter";
import { UpdateComponent } from "../Components/UpdateComponent";
import { LoadingComponent } from "../Components/Loading";
import ErrorComponent from "../Components/ErrorComponent";

interface ActsDevelopmentPageState {
    report: LegislationMonitoringData,
    years: {year: number}[],
    filteredYear: number,
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class ActsDevelopmentPage extends Component<ActsDevelopmentPageState> {
    state: ActsDevelopmentPageState = {
        report: {text: "", month: 0, year: 0},
        years: [],
        filteredYear: 0,
        isUpdating: false,
        error: false,
        errorMessage: ""
    };

    fetchYearsArrange = (): void => {
        fetch("/api/v1/actsDevYears")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(years => this.setState({years: years}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchLastReport = (): void => {
        fetch("/api/v1/actsDevLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, isUpdating: false, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/actsDevReportByYear/${year}`)
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
        this.fetchYearsArrange();
    }

    render(): React.ReactElement {
        const {report, years, filteredYear, isUpdating, error, errorMessage} = this.state;

        const yearsFilterItems = years.map(year => Object({itemValue: year.year, label: year.year.toString()}));
        // const yearsFilterItems = [{itemValue: 2011, label: "2011"}, {itemValue: 2012, label: "2012"}, {itemValue: 2013, label: "2013"}, {itemValue: 2014, label: "2014"},
        //  {itemValue: 2015, label: "2015"}, {itemValue: 2016, label: "2016"}, {itemValue: 2017, label: "2017"}, {itemValue: 2018, label: "2018"}, {itemValue: 2019, label: "2019"}];


        return (
            <>
                <Layout title="Разработка нормативных правовых актов"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <UpButton to="acts_development"/>
                    <h1 id="acts_development" className="text-center page__title">Разработка нормативных правовых актов</h1>
                    <div className="container">
                        <p>Важнейшим направлением деятельности Института является разработка проектов законов и иных нормативных
                            правовых актов Свердловской области, которая осуществляется <Link href="/structure" as="sctructure"><a>отделом разработки проектов нормативных правовых актов.</a></Link></p>
                        <h3 className="text-center page__title">Основными функциями отдела являются:</h3>
                        <p>1) разработка проектов законов Свердловской области, предусмотренных в планах законопроектной работы
                            Законодательного Собрания Свердловской области, и проектов законов Свердловской области, не
                            включенных в данные планы, в случае необходимости их разработки в сжатые сроки;</p>
                        <p>2) разработка наиболее важных проектов нормативных правовых актов Губернатора Свердловской области и
                            Правительства Свердловской области;</p>
                        <p>3) доработка направленных на согласование в Уральский институт регионального законодательства в
                            составе проектов постановлений Правительства Свердловской области проектов законов Свердловской
                            области, предусмотренных в планах законопроектной работы Законодательного Собрания Свердловской
                            области, а также проектов законов Свердловской области, не включенных в данные планы, в случае
                            необходимости их разработки в сжатые сроки;</p>
                        <p> 4) доработка проектов законов Свердловской области, принятых Законодательным Собранием Свердловской
                            области в первом и (или) во втором чтении;</p>
                        <p>5) разработка предложений по перечню законопроектов, подлежащих включению в план законопроектной
                            работы Законодательного Собрания Свердловской области на очередной год, а также предложений высшим
                            органам государственной власти Свердловской области о разработке проектов законов Свердловской
                            области, не включенных в данный план, в случае необходимости их разработки в сжатые сроки;</p>
                        <p> 6) правовая экспертиза проектов нормативных правовых актов Свердловской области и иных документов,
                            направляемых в Уральский институт регионального законодательства;</p>
                        <p> 7) предварительная правовая экспертиза проектов законов Свердловской области, внесенных в
                            Законодательное Собрание Свердловской области в порядке законодательной инициативы, для подготовки
                            заключений Экспертным советом Уральского института регионального законодательства;</p>
                        <p> 8) подготовка тематических обзоров законодательства Российской Федерации и (или) субъектов
                            Российской Федерации;</p>
                        <p> 9) участие в работе комитетов, комиссий, рабочих групп, создаваемых Законодательным Собранием
                            Свердловской области, а также рабочих групп, создаваемых Губернатором Свердловской области и
                            Правительством Свердловской области;</p>
                        <p>10) участие в работе по координации законопроектной деятельности в Свердловской области.</p>
                        <p>Большая часть принятых законов Свердловской области разработана работниками данного отдела. </p>
                        <p><strong>Так, в 2008 году Институтом было разработано 108 проектов законов Свердловской области, в 2009 году – 131, в 2010 году - 106. В 2008 году доработано 73 законопроекта, в 2009 году – 88, в 2010 - 65. </strong></p>
                        <NewsFilter filterName="Год" fetchFunc={this.filterByYear} filterItems={yearsFilterItems}/>
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

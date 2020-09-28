import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {UpButton} from "../Components/UpButton/UpButton";
import {Footer} from "../Components/Footer";
import { LegislationMonitoringData } from "../Types/LegislationMonitoringData";
import { connectionErrorHandler, emptyContentErrorHandler } from "Handlers/errorHanlders";
import { NewsFilter } from "../Components/NewsFIlter/NewsFilter";
import { UpdateComponent } from "../Components/UpdateComponent";
import ErrorComponent from "../Components/ErrorComponent";
import { LoadingComponent } from "../Components/Loading";

interface LegislationAnalysisPageState {
    report: LegislationMonitoringData,
    filteredYear: number,
    isUpdating: boolean,
    error: boolean,
    errorMessage: string
}

export default class LegislationAnalysisPage extends Component<LegislationAnalysisPageState> {
    state: LegislationAnalysisPageState = {
        report: {text: "", month: 0, year: 0},
        filteredYear: 0,
        isUpdating: false,
        error: false,
        errorMessage: ""
    }

    fetchLastReport = (): void => {
        fetch("/api/v1/legislationAnalysisLastReport")
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(report => this.setState({report, filteredYear: report.year, isUpdating: false, error: false}))
            .catch(err => this.setState({error: true, errorMessage: err.message}));
    };

    fetchReportByYear = (year: number): void => {
        fetch(`/api/v1/legislationAnalysisReportByYear/${year}`)
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

        const yearsFilterItems = [{itemValue: 2011, label: "2011"}, {itemValue: 2012, label: "2012"}, {itemValue: 2013, label: "2013"}, {itemValue: 2014, label: "2014"},
         {itemValue: 2015, label: "2015"}, {itemValue: 2016, label: "2016"}, {itemValue: 2017, label: "2017"}, {itemValue: 2018, label: "2018"}, {itemValue: 2019, label: "2019"}];
        
        return (
            <>
                <Layout title="Систематизация и анализ законодательства"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <UpButton to="legislation_analysis"/>
                    <h1 id="legislation_analysis" className="text-center page__title">Систематизация и анализ
                            законодательства</h1>
                    <div className="container">                 
                        <h3 className="text-center page__title">С марта 2009 года:</h3>
                        <p>В целях подготовки предложений по системному совершенствованию
                            законодательства Свердловской области и более полной реализации в нем правотворческой
                            компетенции Свердловской области Институт осуществляет инвентаризацию полномочий субъектов
                            Российской Федерации, предусмотренных в федеральных законах. С целью автоматизации этого
                            направления деятельности Института проводятся работы по созданию информационно-правовой
                            системы <Link href="/region_zakon" as="region_zakon"><a>«Регион-Закон»,</a></Link> внедрение которой позволит получать в
                            оперативном режиме информацию по вопросам реализации Свердловской областью полномочий,
                            отнесенных федеральным законодательством к ведению субъектов Российской Федерации, выявлять
                            пробелы и противоречия, имеющиеся в законах Свердловской области, а также выявлять противоречия
                            в федеральном законодательстве и вносить предложения, направленные на их устранение. </p>
                        <p>Указанные виды работ выполняет <Link href="/structure" as="structure"><a>отдел систематизации законодательства и
                            справочно-информационной работы</a></Link>.</p>
                        <p>Основными функциями отдела являются:</p><p>1) анализ изменений законодательства Российской
                        Федерации с целью подготовки материалов для предложений по внесению изменений в законодательство
                        Свердловской области;</p><p>2) анализ законодательства Свердловской области и выработка рекомендаций
                        по его систематизации;</p><p>3) обеспечение работников Уральского института регионального
                        законодательства оперативной информацией об изменениях в законодательстве Российской Федерации;</p>
                        <p>4) разработка, внедрение и текущее сопровождение программного обеспечения автоматизированной
                            информационно-правовой системы «Регион-Закон»;</p><p>5) ведение информационно-правовой системы
                        «Регион-Закон» и осуществление на ее основе справочно-информационной работы;</p>
                        <p>6) подготовка материалов для предложений по формированию перечня законопроектов, подлежащих
                            включению в план законопроектной работы Законодательного Собрания Свердловской области;</p>
                        <p>7) создание и сопровождение прикладного программного обеспечения для работы с документами в
                            Уральском институте регионального законодательства.</p>
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

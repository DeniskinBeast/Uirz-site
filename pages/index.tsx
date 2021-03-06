import React, {Component} from "react";

import {Layout} from "../Components/Layout";
import {Header} from "../Components/Header";
import {Navbar} from "../Components/Navbar/Navbar";
import {Footer} from "../Components/Footer";
import {NewsCards} from "../Components/NewsCards/NewsCards";
import {YaMap} from "../Components/Map/Map";
import {buttonUp} from "../Scripts/buttonUp";

import {NewsCardData} from "../Types/NewsCardData";
import Link from "next/link";
import {UpButton} from "../Components/UpButton/UpButton";
import {SubNav} from "../Components/SubNav/SubNav";
import Banners from "../Components/MainPage/Banners/Banners";
import Contacts from "../Components/MainPage/Contacts/Contacts";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface MainPageState {
    lastInstNews: NewsCardData[],
    lastLawNews: NewsCardData[],
    error: boolean,
    errorMessage: string
}

export default class MainPage extends Component<MainPageState> {
    state: MainPageState = {
        lastInstNews: [],
        lastLawNews: [],
        error: false,
        errorMessage: ""
    };

    fetchLastInstNewsCards = (): void => {
      fetch("api/v1/lastInstNews")
          .then(connectionErrorHandler)
          .then(response => response.json())
          .then(lastInstNews => this.setState({lastInstNews: lastInstNews, error: false}))
          .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    fetchLastLawNewsCards = (): void => {
      fetch("api/v1/lastLawNews")
          .then(connectionErrorHandler)
          .then(response => response.json())
          .then(lastLawNews => this.setState({lastLawNews: lastLawNews, error: false}))
          .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    componentDidMount(): void {
        buttonUp();
        this.fetchLastInstNewsCards();
        this.fetchLastLawNewsCards();
    }

    render(): React.ReactElement {
        const {lastInstNews, lastLawNews, error, errorMessage} = this.state;
        const subNavItems = [{label: "Общие сведения", scrollTo: "generalInformation"}, {label: "Новости института", scrollTo: "instNews"},
            {label: "Новости законодательства", scrollTo: "lawNews"}, {label: "Контакты", scrollTo: "contacts"},
            {label: "Схема проезда", scrollTo: "locationMap"}, {label: "Сайты высших органов гос. власти", scrollTo: "sitesLinks"}];

        return (
            <>
                <Layout title="Главная страница"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <SubNav subNavId="mainPageSubNav" subNavItems={subNavItems}/>
                    <div className="container">
                        <UpButton to="generalInformation"/>
                            <h1 id="generalInformation" className="text-center page__title">Общие сведения о деятельности Института</h1>
                            <p>Государственное учреждение Свердловской области «Уральский институт регионального
                                законодательства» было учреждено Указом Губернатора Свердловской области от 2 июля 1996
                                года № 240 «О создании государственного учреждения Свердловской области «Уральский
                                институт регионального законодательства» и распоряжением председателя Областной Думы
                                Законодательного Собрания Свердловской области от 20 мая 1996 года № 24 с целью
                                совершенствования нормотворческой деятельности в Свердловской области, повышения
                                качества ее законодательства. </p><p>В Институте была сформирована группа консультантов
                            из высококвалифицированных юристов, в состав <Link href="/experts_council/main"><a>Экспертного
                                совета</a></Link> вошли ведущие ученые-юристы Свердловской области. </p>
                            <p>С 1996 по 2008 год Институт возглавлял Алексей Владимирович Лобашев. С 2008 года -
                                Михаил Викторович Кучин. С 2012 года
                                Институтом руководит <Link href="/structure#sector_1_50"><a>Николай Андреевич
                                    Воронин</a></Link>.</p>

                            <p>На основании Указа Губернатора Свердловской области от 14 октября 2011 года № 904-УГ
                                изменено наименование Института на государственное казённое учреждение Свердловской
                                области «Уральский институт регионального законодательства».</p>
                            <p><Link href="/salary_information" as="salary_information"><a>Информация</a></Link> о рассчитываемой за календарный
                                год среднемесячной заработной плате директора, его заместителей и главного бухгалтера
                                Института размещена в соответствии с Постановлением Правительства Свердловской области
                                от 2 марта 2017 года № 115-ПП «Об утверждении Порядка размещения информации о
                                рассчитываемой за календарный год среднемесячной заработной плате руководителей, их
                                заместителей и главных бухгалтеров Территориального фонда обязательного медицинского
                                страхования Свердловской области, государственных учреждений Свердловской области и
                                государственных унитарных предприятий Свердловской области в
                                информационно-телекоммуникационной сети «Интернет» и представления указанными лицами
                                данной информации».</p><p>За время своей деятельности Институт оказал существенное
                            влияние на становление и развитие законодательства Свердловской области, его своевременное
                            приведение в соответствие с федеральным законодательством, обеспечил необходимое качество
                            законов Свердловской области. Постоянное сотрудничество с органами государственной власти
                            Свердловской области позволило Институту стать ведущим центром правотворческой деятельности
                            в Свердловской области.</p><p>Основным направлением деятельности Института является
                            <Link href="/acts_development" as="acts_development"><a> разработка проектов законов и иных нормативных
                            правовых актов Свердловской области</a></Link>; большая часть принятых законов Свердловской области
                            разработана сотрудниками Института. </p>
                            <p>Другим важным направлением деятельности является проводимая Экспертным советом Института
                                <Link href="/legal_expertise" as="legal_expertise">
                                <a> правовая экспертиза </a></Link>проектов нормативных
                                правовых актов Свердловской области и иных документов.</p>
                            <p>Кроме того, Институт проводит сравнительно-правовой анализ законов субъектов Российской
                                Федерации, на основе которого готовит <Link href="/legislation_reviews" as="/legislation_reviews"><a>обзоры законодательства </a></Link>
                                Российской Федерации и субъектов Российской Федерации.</p>
                            <p>Также Институт осуществляет правовое консультирование по вопросам, представленным в
                                обращениях депутатов Законодательного Собрания Свердловской области, высших органов
                                исполнительной власти Свердловской области, администраций муниципальных образований,
                                различных ведомств; готовит ответы на письма председателя Правительства Свердловской
                                области, председателя Законодательного Собрания Свердловской области по правовым
                                вопросам. </p>
                            <p>Предложения Института составляют основу для формирования плана законопроектной работы
                                Законодательного Собрания Свердловской области на очередной год.</p>
                            <p>Новым направлением деятельности Института является инвентаризация полномочий субъектов
                                Российской Федерации, предусмотренных в федеральных законах, позволяющая готовить
                                предложения по системному совершенствованию законодательства Свердловской области и
                                более полной реализации в нем правотворческой компетенции Свердловской области. С целью
                                автоматизации этого направления деятельности проводятся работы по созданию
                                информационно-правовой системы <Link href="/region_zakon" as="region-zakon"><a>«Регион-Закон»</a></Link>,
                                внедрение которой позволит получать в оперативном режиме информацию по вопросам
                                реализации Свердловской областью полномочий, отнесенных федеральным законодательством к
                                ведению субъектов Российской Федерации, выявлять пробелы и противоречия, имеющиеся в
                                законах Свердловской области, а также выявлять противоречия в федеральном
                                законодательстве и вносить предложения, направленные на их устранение. В рамках развития
                                системы «Регион-Закон» планируется проведение анализа подзаконных нормативных правовых
                                актов Свердловской области на предмет их соответствия федеральным законам и законам
                                Свердловской области и выявление пробелов в правовом регулировании вопросов, относящихся
                                к компетенции соответствующих государственных органов Свердловской области. </p>

                            <p>В соответствии с федеральным законодательством Институтом принята Учетная политика <a
                                target="_blank" href="/docs/mainpage_docs/uchet-politika.pdf">(Основные положения
                                Учетной политики)</a> и новое <a target="_blank" href="/docs/mainpage_docs/pers_dan.pdf">Положение об обработке персональных
                                данных в Уральском институте регионального законодательства</a>. </p>
                            <p>В соответствии с федеральным законодательством в Институте проведена специальная оценка
                                условий труда, по результатам которой подготовлен и утвержден отчет от 26 сентября 2019
                                года. <a target="_blank" href="/docs/mainpage_docs/Svod_vedomost.pdf">(Сводная
                                    ведомость результатов проведения специальной оценки условий труда). </a></p>
                        <h1 id="instNews" className="text-center page__title">Новости института</h1>
                        {!error && <NewsCards newsCards={lastInstNews} cardsType="inst_news"/>}
                        {!error && <div className="btn_container">
                            <Link href="/uniNews/[uniNewsPage]" as="/uniNews/0">
                                <a className="btn btn-outline-secondary uninews_link">Читать все новости</a>
                            </Link>
                        </div>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                        <h1 id="lawNews" className="text-center page__title">Новости законодательства</h1>
                        {!error && <NewsCards newsCards={lastLawNews} cardsType="law_news"/>}
                        {!error && <div className="btn_container">
                            <Link href="/lawNews/[lawNewsPage]" as="/lawNews/0">
                                <a className="btn uninews_link">Читать все новости</a>
                            </Link>
                        </div>}
                        {error && <ErrorComponent errorMessage={errorMessage}/>}
                        <h1 id="contacts" className="text-center page__title">Контакты</h1>
                        <Contacts/>
                        <h2 id="locationMap" className="text-center page__title">Схема проезда</h2>
                        <p className="text-center"><strong>Остановка транспорта:</strong> Драмтеатр</p>
                        <p className="text-center"><img src="/marshrut.gif" alt="Общественный транспорт"></img></p>
                        <YaMap/>
                        <h2 id="sitesLinks" className="text-center page__title">Сайты высших органов государственной власти</h2>
                        <Banners/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

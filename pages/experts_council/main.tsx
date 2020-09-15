import React, {Component} from "react";
import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {SubNav} from "../../Components/SubNav/SubNav";
import {Footer} from "../../Components/Footer";
import {UpButton} from "../../Components/UpButton/UpButton";
import {ProfileCardData} from "../../Types/ProfileCardData";
import {ProfileCards} from "../../Components/ProfileCards/ProfileCards";
import {NewsCardData} from "../../Types/NewsCardData";
import {NewsCards} from "../../Components/NewsCards/NewsCards";
import Link from "next/link";

interface ExpertsCouncilPageState {
    profileCards: ProfileCardData[],
    lastMeetings: NewsCardData[],
    lastWorkingGroups: NewsCardData[]
}

export default class ExpertsCouncilPage extends Component<ExpertsCouncilPageState> {
    state: ExpertsCouncilPageState = {
        profileCards: [],
        lastMeetings: [],
        lastWorkingGroups: []
    };

    fetchProfileCards = (): void => {
        fetch("/api/v1/expertsCouncilProfiles")
            .then(response => response.json())
            .then(profileCards => this.setState({profileCards}))
    };

    fetchLastMeetings = (): void => {
        fetch("/api/v1/expertsCouncilLastMeetings")
            .then(response => response.json())
            .then(lastMeetings => this.setState({lastMeetings}))
    };

    fetchLastWorkingGroups = (): void => {
        fetch("/api/v1/expertsCouncilLastWorkingGroups")
            .then(response => response.json())
            .then(lastWorkingGroups => this.setState({lastWorkingGroups}))
    };

    sortProfileCards = (profileCards: ProfileCardData[]): ProfileCardData[] => {
        return profileCards.sort(this.compareFunc)
    };

    compareFunc = (a: ProfileCardData, b: ProfileCardData) => {
        return a.npp - b.npp;
    };

    componentDidMount(): void {
        this.fetchProfileCards();
        this.fetchLastMeetings();
        this.fetchLastWorkingGroups();
    }

    render(): React.ReactElement {
        const {profileCards, lastMeetings, lastWorkingGroups} = this.state;

        const subNavItems = [{label: "Положение", scrollTo: "document"}, {label: "Состав совета", scrollTo: "structure"},
            {label: "График заседаний", scrollTo: "schedule"}, {label: "Повестка предстоящего заседания", scrollTo: "upcoming_meetings"},
            {label: "Повестки прошедших заседаний", scrollTo: "past_meetings"}, {label: "Повестка рабочей группы", scrollTo: "working_group"},
            {label: "Деятельность совета", scrollTo: "info"}];

        return (
            <>
                <Layout title="Экспертный совет"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <SubNav subNavId="expertsSubNav" subNavItems={subNavItems}/>
                    <UpButton to="document"/>
                    <div className="container">
                        <h1 id="document" className="text-center page__title">Положение об экспертном совете</h1>
                        <p>Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения Текст положения </p>
                        <h1 id="structure" className="text-center page__title">Состав совета</h1>
                        <ProfileCards profileCards={this.sortProfileCards(profileCards)} sectorId={2}/>
                        <h1 id="schedule" className="text-center page__title">График заседаний</h1>
                        <p className="text-center">Заседание пройдет 15.09.2020 в 14:00</p>
                        <p className="text-center">Заседание пройдет 15.10.2020 в 14:00</p>
                        <p className="text-center">Заседание пройдет 15.11.2020 в 14:00</p>
                        <h1 id="upcoming_meetings" className="text-center page__title">Повестка предстоящего заседания</h1>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки  </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <h1 id="past_meetings" className="text-center page__title">Повестки прошедших заседаний</h1>
                        <NewsCards newsCards={lastMeetings} cardsType="inst_news"/>
                        <div className="btn_container">
                            <Link href="/experts_council/past_meetings" as="/experts_council/past_meetings">
                                <a className="btn btn-outline-secondary uninews_link">Посмотреть все повестки</a>
                            </Link>
                        </div>
                        <h1 id="working_group" className="text-center page__title">Повестка рабочей группы</h1>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки  </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <p>Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки Текст повестки </p>
                        <h1 className="text-center page__title">Повестки прошедших рабочих групп</h1>
                        <NewsCards newsCards={lastWorkingGroups} cardsType="working_group"/>
                        <div className="btn_container">
                            <Link href="/experts_council/working_group" as="/experts_council/working_group">
                                <a className="btn btn-outline-secondary uninews_link">Посмотреть все</a>
                            </Link>
                        </div>
                        <h1 id="info" className="text-center page__title">Информация о деятельности</h1>
                        <p>Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности </p>
                        <p>Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности </p>
                        <p>Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности </p>
                        <p>Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности Информация о деятельности </p>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

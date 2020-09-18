import React, {Component} from "react";

import "isomorphic-fetch";
import {ProfileCardData} from "../Types/ProfileCardData";

import {ProfileCards} from "../Components/ProfileCards/ProfileCards";
import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {SubNav} from "../Components/SubNav/SubNav";
import {UpButton} from "../Components/UpButton/UpButton";
import {LoadingComponent} from "../Components/Loading";
import {connectionErrorHandler} from "../server/Handlers/errorHanlders";
import ErrorComponent from "../Components/ErrorComponent";

interface StructurePageState {
    unnamedCards: ProfileCardData[],
    expertCards: ProfileCardData[],
    developCards: ProfileCardData[],
    systematizationCards: ProfileCardData[],
    organizationCards: ProfileCardData[],
    unnamed2Cards: ProfileCardData[]
    error: boolean,
    errorMessage: string;
}

export default class StructurePage extends Component<StructurePageState> {
    state: StructurePageState = {
        unnamedCards: [],
        expertCards: [],
        developCards: [],
        systematizationCards: [],
        organizationCards: [],
        unnamed2Cards: [],
        error: false,
        errorMessage: ""
    };

    fetchProfileCards = (): void => {
        fetch(`/api/v1/structure`)
            .then(connectionErrorHandler)
            .then(response => response.json())
            .then(profileCards => {
                const unnamedCards = this.divideCards(profileCards, 1);
                const expertCards = this.divideCards(profileCards, 2);
                const developCards = this.divideCards(profileCards, 3);
                const systematizationCards = this.divideCards(profileCards, 5);
                const organizationCards = this.divideCards(profileCards, 6);
                const unnamed2Cards = this.divideCards(profileCards, 7);

                this.setState({unnamedCards, expertCards, developCards, systematizationCards, organizationCards, unnamed2Cards, error: false})
            })
            .catch(err => this.setState({error: true, errorMessage: err.message}))
    };

    divideCards = (profileCards: ProfileCardData[], sector: number): ProfileCardData[] => {
        return profileCards.filter(profileCard =>  profileCard.sector == sector).sort(this.compareFunc)
    };

    compareFunc = (a: ProfileCardData, b: ProfileCardData) => {
        return a.npp - b.npp;
    };

    componentDidMount(): void {
        this.fetchProfileCards();
    }

    render(): React.ReactElement {
        const {unnamedCards, expertCards, developCards, systematizationCards, organizationCards, unnamed2Cards, error, errorMessage} = this.state;
        const subNavItems = [{label: "Неназванный отдел", scrollTo: "sector_1"}, {label: "Экспертный совет", scrollTo: "sector_2"},
            {label: "Отдел разработки нормативных правовых актов", scrollTo: "sector_3"},
            {label: "Отдел систематизации законодательства и справочно-информационной работы", scrollTo: "sector_5"},
            {label: "Организационно-правовой отдел", scrollTo: "sector_6"}];

        if (error)
            return (
                <>
                    <Layout title="Структура института"/>
                    <Navbar/>
                    <div className="content">
                        <Header/>
                        <SubNav subNavId="structurePageSubNav" subNavItems={subNavItems}/>
                        <ErrorComponent errorMessage={errorMessage}/>
                    </div>
                    <Footer/>
                </>
            );

        return (
            <>
                <Layout title="Структура института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <SubNav subNavId="structurePageSubNav" subNavItems={subNavItems}/>
                    <UpButton to="sector_1"/>
                    <div className="container">
                        {unnamedCards.length == 0 || unnamed2Cards.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={unnamedCards.concat(unnamed2Cards)} sectorId={1}/>
                        {expertCards.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={expertCards} sectorId={2}/>
                        {developCards.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={developCards} sectorId={3}/>
                        {systematizationCards.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={systematizationCards} sectorId={5}/>
                        {organizationCards.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={organizationCards} sectorId={6}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

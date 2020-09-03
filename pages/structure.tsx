import React, {Component} from "react";

import "isomorphic-fetch";
import {ProfileCardData} from "../Types/ProfileCardData";

import {ProfileCards} from "../Components/ProfileCards/ProfileCards";
import {Layout} from "../Components/Layout";
import {Navbar} from "../Components/Navbar/Navbar";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";
import {DepartmentsNav} from "../Components/DepartmentsNav/DepartmentsNav";
import {UpButton} from "../Components/UpButton/UpButton";
import {LoadingComponent} from "../Components/Loading";

interface StructurePageState {
    unnamedCards: ProfileCardData[];
    expertCards: ProfileCardData[];
    developCards: ProfileCardData[];
    systematizationCards: ProfileCardData[];
    organizationCards: ProfileCardData[];
    unnamed2Cards: ProfileCardData[];
}

export default class StructurePage extends Component<StructurePageState> {
    state: StructurePageState = {
        unnamedCards: [],
        expertCards: [],
        developCards: [],
        systematizationCards: [],
        organizationCards: [],
        unnamed2Cards: []
    };

    fetchProfileCards = (): void => {
        fetch(`/api/v1/structure`)
            .then(response => response.json())
            .then(profileCards => {
                const unnamedCards = this.divideCards(profileCards, 1);
                const expertCards = this.divideCards(profileCards, 2);
                const developCards = this.divideCards(profileCards, 3);
                const systematizationCards = this.divideCards(profileCards, 5);
                const organizationCards = this.divideCards(profileCards, 6);
                const unnamed2Cards = this.divideCards(profileCards, 7);

                this.setState({unnamedCards, expertCards, developCards, systematizationCards, organizationCards, unnamed2Cards})
            })
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
        const {unnamedCards, expertCards, developCards, systematizationCards, organizationCards, unnamed2Cards} = this.state;
        return (
            <>
                <Layout title="Структура института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <DepartmentsNav/>
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

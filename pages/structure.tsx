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
    profileCards_1: ProfileCardData[];
    profileCards_2: ProfileCardData[];
    profileCards_3: ProfileCardData[];
    profileCards_5: ProfileCardData[];
    profileCards_6: ProfileCardData[];
    profileCards_7: ProfileCardData[];
}

export default class StructurePage extends Component<StructurePageState> {
    state: StructurePageState = {
        profileCards_1: [],
        profileCards_2: [],
        profileCards_3: [],
        profileCards_5: [],
        profileCards_6: [],
        profileCards_7: []
    };

    fetchProfileCards = (): void => {
        fetch(`/api/v1/structure`)
            .then(response => response.json())
            .then(profileCards => {
                const profileCards_1 = this.divideCards(profileCards, 1);
                const profileCards_2 = this.divideCards(profileCards, 2);
                const profileCards_3 = this.divideCards(profileCards, 3);
                const profileCards_5 = this.divideCards(profileCards, 5);
                const profileCards_6 = this.divideCards(profileCards, 6);
                const profileCards_7 = this.divideCards(profileCards, 7);

                this.setState({profileCards_1, profileCards_2, profileCards_3, profileCards_5, profileCards_6, profileCards_7})
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
        const {profileCards_1, profileCards_2, profileCards_3, profileCards_5, profileCards_6, profileCards_7} = this.state;
        return (
            <>
                <Layout title="Структура института"/>
                <Navbar/>
                <div className="content">
                    <Header/>
                    <DepartmentsNav/>
                    <UpButton to="sector_1"/>
                    <div className="container">
                        {profileCards_1.length == 0 || profileCards_7.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={profileCards_1.concat(profileCards_7)} sectorId={1}/>
                        {profileCards_2.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={profileCards_2} sectorId={2}/>
                        {profileCards_3.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={profileCards_3} sectorId={3}/>
                        {profileCards_5.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={profileCards_5} sectorId={5}/>
                        {profileCards_6.length == 0 && <LoadingComponent/>}
                        <ProfileCards profileCards={profileCards_6} sectorId={6}/>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

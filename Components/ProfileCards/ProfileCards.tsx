import React from "react";

import {ModalInfo} from "../ModalInfo/ModalInfo";
import {ProfileCardData} from "../../Types/ProfileCardData";

import styles from "./profileCards.module.css";

interface ProfileCardsProps {
    profileCards: ProfileCardData[],
    sectorId: number;
}

// @ts-ignore
function getSectorName(sectorId: number): string {
    switch (sectorId) {
        case 1: {
            return "Неназванный отдел";
        }
        case 2:
            return "Экспертный совет";
        case 3:
            return "Отдел разработки проектов нормативных правовых актов";
        case 5:
            return "Отдел систематизации законодательства и справочно-информационной работы";
        case 6:
            return "Организационно-правовой отдел";
        default:
            return "";
    }
}

function renderProfileCard(profileCard: ProfileCardData) {
    const full_name = profileCard.full_surname + " " + profileCard.full_name + " " + profileCard.full_midname;
    const photoPath = "/profile_photos/";
    const cardId = `sector_${profileCard.sector}_${profileCard.id}`;
    return (
        <>
        <div className="col-md-4 col-lg-4">
            <div className={"card " + styles.card}>
                <div className="card-img text-center">
                    <img className={styles.card__img} src={photoPath + profileCard.pic} alt="Фотография профиля"/>
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title">{full_name}</h4>
                    <p className="card-text">{profileCard.position}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Кабинет: {profileCard.office}</li>
                    <li className="list-group-item">Телефон: {profileCard.phone}</li>
                    <li className="list-group-item">Email: {profileCard.email}</li>
                </ul>
                <div className="card-footer">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + cardId}>Подробнее</button>
                </div>
            </div>
        </div>
        <ModalInfo id={cardId} title={profileCard.position} pic={photoPath + profileCard.pic} subtitle={full_name} text={profileCard.bio}/>
        </>
    )
}

export function ProfileCards({profileCards, sectorId}: ProfileCardsProps) {
    const sectorName = getSectorName(sectorId);
    return (
        <>
            <h2 id={`sector_${sectorId}`} className="text-center page__title">{sectorName}</h2>
            <div className={"card-group " + styles.group}>
                {profileCards.map(renderProfileCard)}
            </div>
        </>
    )
}

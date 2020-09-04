import React from "react";
import ReactHtmlParser from "react-html-parser";

import {NewsCardData} from "../../Types/NewsCardData";
import {ModalInfo} from "../ModalInfo/ModalInfo";

import styles from "./newsCards.module.css";
import {deleteSymbols} from "../../Scripts/deleteSymbols";

interface NewsCardsProps {
    newsCards: NewsCardData[]
}

function renderNewsCard(newsCard: NewsCardData) {
    const isLawNewsCard = newsCard.name == "Новые законы Свердловской области" || newsCard.name.match(/[0-9]* новых (законов|закона) Свердловской области/);
    const imgDirPath = isLawNewsCard ? "/law_news/" : "/inst_news/";
    const imgPath = imgDirPath + newsCard.pic;
    const clearAnons = deleteSymbols(newsCard.anons);
    const cardType = isLawNewsCard ? "law_news" : "inst_news";
    const cardId = cardType + newsCard.id;

    return (
        <>
        <div className="col-md-4 col-lg-4 col-sm-12">
            <div className={styles.card}>
                <div className="card-img">
                    <img src={imgPath} className="img-fluid"/>
                </div>

                <div className={"card-body " + styles.card__body}>
                    <h4 className={"card-title " + styles.card__title}>{ReactHtmlParser(newsCard.name)}</h4>
                    <h5 className="card-subtitle">{newsCard.date}</h5>
                    <p className="card-text">
                        {ReactHtmlParser(clearAnons)}
                    </p>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-outline-secondary card-button" data-toggle="modal" data-target={"#" + cardId}>Читать</button>
                </div>
            </div>
        </div>
            {newsCard.name.startsWith("Заседание Экспертного совета") && <ModalInfo id={cardId} title={"Заседание Экспертного совета"} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
            {newsCard.name=="Новые законы Свердловской области" && <ModalInfo id={cardId} title={"Новые законы Свердловской области"} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
            {(newsCard.name !== "Новые законы Свердловской области" && !newsCard.name.startsWith("Заседание Экспертного совета")) && <ModalInfo id={cardId} title={newsCard.name} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
        </>
    )
}

export function NewsCards({newsCards}: NewsCardsProps) {
    return (
        <div className={"row " + styles.row}>
            {newsCards.map(renderNewsCard)}
        </div>
    )
}

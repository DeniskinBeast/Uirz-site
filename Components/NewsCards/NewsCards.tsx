import React from "react";
import ReactHtmlParser from "react-html-parser";

import {NewsCardData} from "../../Types/NewsCardData";
import {ModalInfo} from "../ModalInfo/ModalInfo";

import styles from "./newsCards.module.css";

interface NewsCardsProps {
    newsCards: NewsCardData[]
}
//TODO Сменить картинку и подумать над тем, чтоб подрубить babel-plugin-transform-react-statements
function renderNewsCard(newsCard: NewsCardData) {
    const imgDirPath = newsCard.name == "Новые законы Свердловской области" ? "/law_news/" : "/inst_news/";
    const imgPath = imgDirPath + newsCard.pic;

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
                        {ReactHtmlParser(newsCard.anons)}
                    </p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-outline-secondary card-button" data-toggle="modal" data-target={"#" + newsCard.id}>Читать</button>
                </div>
            </div>
        </div>
            {newsCard.name.startsWith("Заседание Экспертного совета") && <ModalInfo id={newsCard.id.toString()} title={"Заседание Экспертного совета"} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
            {newsCard.name=="Новые законы Свердловской области" && <ModalInfo id={newsCard.id.toString()} title={"Новые законы Свердлловской области"} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
            {(newsCard.name !== "Новые законы Свердловской области" && !newsCard.name.startsWith("Заседание Экспертного совета")) && <ModalInfo id={newsCard.id.toString()} title={newsCard.name} subtitle={newsCard.date} pic={imgPath} text={newsCard.text}/>}
        </>
    )
}

export function NewsCards({newsCards}: NewsCardsProps) {
    return (
        <div className="row">
            {newsCards.map(renderNewsCard)}
        </div>
    )
}

import React from "react";
import ReactHtmlParser from "react-html-parser";

import {NewsCardData} from "../../Types/NewsCardData";

import styles from "./newsCards.module.css";
import Link from "next/link";
import {ModalInfo} from "../ModalInfo/ModalInfo";

interface NewsCardsProps {
    newsCards: NewsCardData[]
}
//TODO Сменить картинку и подумать над тем, чтоб подрубить babel-plugin-transform-react-statements
function renderNewsCard(newsCard: NewsCardData) {
    return (
        <>
        <div className="col-md-4 col-lg-4 col-sm-12">
            <div className={styles.card}>
                <div className="card-img">
                    <img src="/docs.jpg" className="img-fluid"/>
                </div>

                <div className={"card-body " + styles.card__body}>
                    <h4 className={"card-title " + styles.card__title}>{ReactHtmlParser(newsCard.name)}</h4>
                    <h5 className="card-subtitle">{newsCard.date}</h5>
                    <p className="card-text">
                        {ReactHtmlParser(newsCard.anons)}
                    </p>
                </div>
                <div className="card-footer">
                    {newsCard.name == "Новые законы Свердловской области" && <Link href="/" as="/"><button className="btn btn-outline-secondary card-button">Читать</button></Link>}
                    {newsCard.name.startsWith("Заседание Экспертного совета") && <button className="btn btn-outline-secondary card-button" data-toggle="modal" data-target={"#" + newsCard.id}>Читать</button>}
                    {(newsCard.name !== "Новые законы Свердловской области" && !newsCard.name.startsWith("Заседание Экспертного совета")) && <Link href="/" as="/"><a className="btn btn-outline-secondary card-button">Читать</a></Link>}
                </div>
            </div>
        </div>
            {newsCard.name.startsWith("Заседание Экспертного совета") && <ModalInfo id={newsCard.id.toString()} title={"Заседание Экспертного совета"} subtitle={newsCard.date} pic="/docs.jpg" text={newsCard.text}/>}
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

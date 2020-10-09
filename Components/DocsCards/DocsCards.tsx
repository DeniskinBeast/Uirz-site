import React from "react";
import {DocsCardData} from "../../Types/DocsCardData";

import styles from "./docsCards.module.css";

interface DocsCardsProps {
    docsCards: DocsCardData[]
}

function renderDocCard(docCard: DocsCardData) {
    return (
        <div className="col-md-4 col-lg-4 col-sm-12">
            <div className={"card " + styles.card}>
                <img className="card-img-top" src={docCard.img_path} alt="Изображение документа"/>
                <div className="card-body">
                    <p className="card-text text-center">
                        {docCard.doc_name}
                    </p>
                </div>
                {docCard.doc_path &&
                <div className="card-footer">
                    <a className="btn card-button" href={docCard.doc_path} target="_blank">Просмотр</a>
                </div>}
            </div>
        </div>
    )
}

export function DocsCards({docsCards}: DocsCardsProps) {
    return (
        <div className={"row " + styles.row}>
            {docsCards.map(renderDocCard)}
        </div>
    )
}

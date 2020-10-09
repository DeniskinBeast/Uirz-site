import React from "react";
import ReactHtmlParser from "react-html-parser";

import styles from "./modalInfo.module.css";

interface ModalInfoProps {
    id: string;
    title: string;
    subtitle: string;
    pic: string;
    text: string;
}

export function ModalInfo({id, title, subtitle, pic, text}: ModalInfoProps) {
    return (
        <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-labelledby="modal_info_1_title" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="modal_info_1_title">{ReactHtmlParser(title)}</h4>
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.header}>
                            <div className={styles.header__img}>
                                <img className={"img-fluid " + styles.img} src={pic} alt="Изображение в заголовке"/>
                            </div>
                            <h5 className={styles.header__subtitle}>{subtitle}</h5>
                        </div>
                        <div>{ReactHtmlParser(text)}</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal">Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from "react";

import styles from "./banners.module.css";

export default function Banners() {
    return (
        <div className={"text-center " + styles.banner__container}>
            <div className={styles.banner}>
                <a href="http://gubernator96.ru/" target="_blank"><img src="/sites_banners/gubernator-banner.png"/></a>
            </div>
            <div className={styles.banner}>
                <a href="http://zsso.ru/" target="_blank"><img src="/sites_banners/logo_zsso.jpg"/></a>
            </div>
            <div className={styles.banner}>
                <a href="http://midural.ru/" target="_blank"><img src="/sites_banners/pravit.gif"/></a>
            </div>
        </div>
    )
}

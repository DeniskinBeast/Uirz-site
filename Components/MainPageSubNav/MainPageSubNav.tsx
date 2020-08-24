import React from "react";
import {Link as ScrollLink} from "react-scroll";

import styles from "./mainPageSubNav.module.css";

export function MainPageSubNav() {
    return (
        <div className={"navbar navbar-expand-lg " + styles.nav}>
            <button className={"navbar-toggler " + styles.navbar_toggler} type="button" data-toggle="collapse" data-target="#mainNavbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon " + styles.navbar_toggler_icon}></span>
            </button>
            <div className={"collapse navbar-collapse " + styles.navbar_collapse} id="mainNavbarSupportedContent">
                <div className={"navbar-nav " + styles.navbar_nav}>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="generalInformation" offset={-50} smooth={true}>
                        Общие сведения
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="instNews" offset={-50} smooth={true}>
                        Новости института
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="lawNews" offset={-50} smooth={true}>
                        Новости законодательства
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="contacts" offset={-50} smooth={true}>
                        Контакты
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="locationMap" offset={-50} smooth={true}>
                       Схема проезда
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sitesLinks" offset={-50} smooth={true}>
                        Сайты высших органов гос. власти
                    </ScrollLink>
                </div>
            </div>
        </div>
    )
}

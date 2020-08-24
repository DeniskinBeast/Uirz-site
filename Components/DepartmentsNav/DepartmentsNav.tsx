import React from "react";
import {Link as ScrollLink} from "react-scroll";

import styles from "./departmentsNav.module.css";

export function DepartmentsNav() {
    return (
        <div className={"navbar navbar-expand-lg " + styles.nav}>
            <button className={"navbar-toggler " + styles.navbar_toggler} type="button" data-toggle="collapse" data-target="#structNavbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon " + styles.navbar_toggler_icon}></span>
            </button>
            <div className={"collapse navbar-collapse " + styles.navbar_collapse} id="structNavbarSupportedContent">
                <div className={"navbar-nav " + styles.navbar_nav}>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sector_1" offset={-50} smooth={true}>
                        Неназванный отдел
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sector_2" offset={-50} smooth={true}>
                        Экспертный совет
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sector_3" offset={-50} smooth={true}>
                        Отдел разработки нормативных правовых актов
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sector_5" offset={-50} smooth={true}>
                        Отдел систематизации законодательства и справочно-информационной работы
                    </ScrollLink>
                    <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to="sector_6" offset={-50} smooth={true}>
                        Организационно-правовой отдел
                    </ScrollLink>
                </div>
            </div>
        </div>
        )
}

import React from "react";
import Link from "next/link";
import {Link as ScrollLink} from "react-scroll";

import styles from "./navbar.module.css";

//TODO не забыть убрать лишнее из стилей и убрать контакты из раздела "Об институтте"
export function Navbar() {
    return (
    <nav className={"navbar navbar-expand-lg fixed-top " + styles.navbar}>
        <Link href="/">
            <a className={"navbar-brand " + styles.nav_brand}>УИРЗ</a>
        </Link>
        <button className={"navbar-toggler " + styles.navbar_toggler} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={"navbar-toggler-icon " + styles.navbar_toggler_icon}></span>
        </button>

        <div className={"collapse navbar-collapse " + styles.navbar_collapse} id="navbarSupportedContent">
            <ul className="navbar-nav mr-4">

                <li className="nav-item dropdown">
                    <button className={"nav-btn btn dropdown-toggle " + styles.nav_btn} type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Об институте
                    </button>
                    <div className="dropdown-menu">
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Общие сведения</a>
                        <Link href="/structure" as="structure">
                            <a className={"dropdown-item " + styles.dropdown_item}>Структура института</a>
                        </Link>
                        <Link href="/constituent_docs" as="constituent_docs">
                            <a className={"dropdown-item " + styles.dropdown_item}>Учредительные документы</a>
                        </Link>
                        <ScrollLink className={"dropdown-item " + styles.dropdown_item} href="" activeClass="active" to="contacts" smooth={true} offset={-50}>Контакты</ScrollLink>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className={"nav-btn btn dropdown-toggle " + styles.nav_btn} type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Основные направления деятельности
                    </button>
                    <div className="dropdown-menu">
                        <Link href="/acts_development" as="acts_development">
                            <a className={"dropdown-item " + styles.dropdown_item}>Разработка проектов нормативных правовых актов</a>
                        </Link>
                        <Link href="/legal_expertise" as="legal_expertise">
                            <a className={"dropdown-item " + styles.dropdown_item}>Правовая экспертиза нормативных правовых актов</a>
                        </Link>
                        <Link href="/legislation_analysis" as="legislation_analysis">
                            <a className={"dropdown-item " + styles.dropdown_item}>Систематизация и анализ законодательства</a>
                        </Link>
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Мониторинг федерального и региональгого законодательства</a>
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Противодействие коррупции</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className={"nav-btn btn dropdown-toggle " + styles.nav_btn} type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Доклады, обзоры, публикации
                    </button>
                    <div className="dropdown-menu">
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Доклады о состоянии законодательства</a>
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Выступления и участия в мероприятиях</a>
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Тематические обзоры законодательства</a>
                        <a className={"dropdown-item " + styles.dropdown_item} href="">Публикации</a>
                    </div>
                </li>
                <li className="nav-item">
                    <button className={"nav-btn btn " + styles.nav_btn}>Экспертный совет</button>
                </li>
                <li className="nav-item">
                    <a className={"nav-btn btn " + styles.nav_btn} href="http://sovet-m.uirz.ru/" target="_blank">Совет по мониторингу</a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

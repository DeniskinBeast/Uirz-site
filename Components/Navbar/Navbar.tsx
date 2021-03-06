import React from "react";
import Link from "next/link";

import styles from "./navbar.module.css";

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
                    <div className={"dropdown-menu " + styles.dropdown_menu}>
                        <Link href="/structure" as="structure">
                            <a className={"dropdown-item " + styles.dropdown_item}>Структура института</a>
                        </Link>
                        <Link href="/constituent_docs" as="constituent_docs">
                            <a className={"dropdown-item " + styles.dropdown_item}>Учредительные документы</a>
                        </Link>
                        <Link href="/uniNews/[uniNewsPage]" as="/uniNews/0">
                            <a className={"dropdown-item " + styles.dropdown_item}>Новости института</a>
                        </Link>
                        <Link href="/lawNews/[lawNewsPage]" as="/lawNews/0">
                            <a className={"dropdown-item " + styles.dropdown_item}>Новости законодательства</a>
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className={"nav-btn btn dropdown-toggle " + styles.nav_btn} type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Основные направления деятельности
                    </button>
                    <div className={"dropdown-menu " + styles.dropdown_menu}>
                        <Link href="/acts_development" as="acts_development">
                            <a className={"dropdown-item " + styles.dropdown_item}>Разработка проектов нормативных правовых актов</a>
                        </Link>
                        <Link href="/legal_expertise" as="legal_expertise">
                            <a className={"dropdown-item " + styles.dropdown_item}>Правовая экспертиза нормативных правовых актов</a>
                        </Link>
                        <Link href="/legislation_analysis" as="legislation_analysis">
                            <a className={"dropdown-item " + styles.dropdown_item}>Систематизация и анализ законодательства</a>
                        </Link>
                        <Link href="/federal_legislation_monitoring" as="/federal_legislation_monitoring">
                            <a className={"dropdown-item " + styles.dropdown_item} href="">Мониторинг Федерального законодательства</a>
                        </Link>
                        <Link href="/regional_legislation_monitoring/main">
                            <a className={"dropdown-item " + styles.dropdown_item} href="">Мониторинг Региональгого законодательства</a>
                        </Link>
                        <Link href="/corruption_countering" as="corruption_countering">
                            <a className={"dropdown-item " + styles.dropdown_item} href="">Противодействие коррупции</a>
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className={"nav-btn btn dropdown-toggle " + styles.nav_btn} type="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Доклады, обзоры, публикации
                    </button>
                    <div className={"dropdown-menu " + styles.dropdown_menu}>
                        <Link href="/legislation_status" as="legislation_status">
                            <a className={"dropdown-item " + styles.dropdown_item}>Доклады о состоянии законодательства</a>
                        </Link>
                        <Link href="/events_participation" as="events_participation">
                            <a className={"dropdown-item " + styles.dropdown_item}>Выступления и участия в мероприятиях</a>
                        </Link>
                        <Link href="/legislation_reviews" as="legislation_reviews">
                            <a className={"dropdown-item " + styles.dropdown_item}>Тематические обзоры законодательства</a>
                        </Link>
                        <Link href="/publications" as="publications">
                            <a className={"dropdown-item " + styles.dropdown_item}>Публикации</a>
                        </Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link href="/experts_council/main" as="/experts_council/main">
                        <a className={"nav-btn btn " + styles.nav_btn}>Экспертный совет</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className={"nav-btn btn " + styles.nav_btn} href="http://sovet-m.uirz.ru/" target="_blank">Совет по мониторингу</a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

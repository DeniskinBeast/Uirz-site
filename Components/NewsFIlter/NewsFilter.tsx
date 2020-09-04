import React from "react";

import styles from "./newsFilter.module.css";

interface NewsFilterProps {
    fetchFunc: (year: number, pageNumber: number) => void
}

export function NewsFilter ({fetchFunc}: NewsFilterProps) {
    return (
        <div className="dropdown dropright">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Фильтр по годам
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={_ => fetchFunc(0, 0)} className={"dropdown-item " + styles.dropdown_item}>Все года</button>
                <button onClick={_ => fetchFunc(2020, 0)} className={"dropdown-item " + styles.dropdown_item}>2020</button>
                <button onClick={_ => fetchFunc(2019, 0)} className={"dropdown-item " + styles.dropdown_item}>2019</button>
                <button onClick={_ => fetchFunc(2018, 0)} className={"dropdown-item " + styles.dropdown_item}>2018</button>
                <button onClick={_ => fetchFunc(2017, 0)} className={"dropdown-item " + styles.dropdown_item}>2017</button>
                <button onClick={_ => fetchFunc(2016, 0)} className={"dropdown-item " + styles.dropdown_item}>2016</button>
                <button onClick={_ => fetchFunc(2015, 0)} className={"dropdown-item " + styles.dropdown_item}>2015</button>
                <button onClick={_ => fetchFunc(2014, 0)} className={"dropdown-item " + styles.dropdown_item}>2014</button>
                <button onClick={_ => fetchFunc(2013, 0)} className={"dropdown-item " + styles.dropdown_item}>2013</button>
                <button onClick={_ => fetchFunc(2012, 0)} className={"dropdown-item " + styles.dropdown_item}>2012</button>
                <button onClick={_ => fetchFunc(2011, 0)} className={"dropdown-item " + styles.dropdown_item}>2011</button>
                <button onClick={_ => fetchFunc(2010, 0)} className={"dropdown-item " + styles.dropdown_item}>2010</button>
            </div>
        </div>
    )
}

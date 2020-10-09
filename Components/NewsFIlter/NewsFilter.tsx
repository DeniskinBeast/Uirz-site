import React from "react";

import styles from "./newsFilter.module.css";

interface NewsFilterProps {
    filterName: string,
    fetchFunc: (year: number, pageNumber: number) => void,
    filterItems: {itemValue: number, label: string}[]
}

function renderYearButton(itemValue: number, label: string, fetchFunc: (year: number, pageNumber: number) => void) {
    return (
        <button onClick={_ => fetchFunc(itemValue, 0)} className={"dropdown-item " + styles.dropdown_item}>{label}</button>
    )
}

export function NewsFilter ({filterName, fetchFunc, filterItems}: NewsFilterProps) {
    return (
        <div className="dropdown dropright filter">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {filterName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {filterItems.map(filterItem => renderYearButton(filterItem.itemValue, filterItem.label, fetchFunc))}
            </div>
        </div>
    )
}

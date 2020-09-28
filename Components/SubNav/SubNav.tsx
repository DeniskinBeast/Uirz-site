import React from "react";
import {Link as ScrollLink} from "react-scroll";

import styles from "./subNav.module.css";

interface SubNavProps {
    subNavId: string,
    subNavItems: {label: string, scrollTo: string}[]
}

function renderSubNavItem(subNavItem: {label: string, scrollTo: string}) {
    return (
        <ScrollLink href="" className={"btn " + styles.nav_item} activeClass="active" to={subNavItem.scrollTo} offset={-70} smooth={true}>
            {subNavItem.label}
        </ScrollLink>
    )
}

export function SubNav({subNavId, subNavItems}: SubNavProps) {
    return (
        <div className={"navbar navbar-expand-lg " + styles.nav}>
            <button className={"navbar-toggler " + styles.navbar_toggler} type="button" data-toggle="collapse" data-target={`#${subNavId}`}
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon " + styles.navbar_toggler_icon}></span>
            </button>
            <div className={"collapse navbar-collapse " + styles.navbar_collapse} id={subNavId}>
                <div className={"navbar-nav " + styles.navbar_nav}>
                    {subNavItems.map(renderSubNavItem)}
                </div>
            </div>
        </div>
        )
}

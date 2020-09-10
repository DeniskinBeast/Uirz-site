import React from "react";
import Link from "next/link";

import styles from "./monitoringSubNav.module.css";

interface MonitoringSubNavProps {
    subNavId: string,
    subNavItems: {label: string, href: string, as: string}[]
}

function renderSubNavItem(subNavItem: {label: string, href: string, as: string}) {
    return (
        <Link href={subNavItem.href} as={subNavItem.as}>
            <a className={"btn " + styles.nav_item}>{subNavItem.label}</a>
        </Link>
    )
}

export function MonitoringSubNav({subNavId, subNavItems}: MonitoringSubNavProps) {
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

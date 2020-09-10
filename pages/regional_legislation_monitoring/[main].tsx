import React from "react";

import {Layout} from "../../Components/Layout";
import {Navbar} from "../../Components/Navbar/Navbar";
import {Header} from "../../Components/Header";
import {MonitoringSubNav} from "../../Components/MonitoringSubNav/MonitoringSubNav";
import {Footer} from "../../Components/Footer";


export default function RegionalLegislationMonitoringMainPage() {
    const subNavItems = [{label: "Общая информация", href: "/regional_legislation_monitoring/[main]", as: "/regional_legislation_monitoring/main"},
        {label: "Законы Свердловской области", href: "/regional_legislation_monitoring/[regional_law]", as: "/regional_legislation_monitoring/regional_law"},
        {label: "Указы губернатора", href: "/regional_legislation_monitoring/[governor_decrees]", as: "/regional_legislation_monitoring/governor_decrees"},
        {label: "Постановления правительства Свердловской области", href: "/regional_legislation_monitoring/[government_decrees]", as: "/regional_legislation_monitoring/[government_decrees]"},
        {label: "Нормативно-правовые акты исполнительных органов Свердловской области", href: "/regional_legislation_monitoring/[general_documents]", as: "/regional_legislation_monitoring/general_documents"}];

    return (
        <>
            <Layout title="Мониторинг регионального законодательства"/>
            <Navbar/>
            <div className="content">
                <Header/>
                <MonitoringSubNav subNavId="monitoringSubNav" subNavItems={subNavItems}/>
                <h1 className="text-center page__title">Мониторинг регионального законодательства</h1>
                <div className="container">
                    <p>Тут должна быть общая информация</p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

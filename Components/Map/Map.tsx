import {FullscreenControl, Map, Placemark, TrafficControl, TypeSelector, YMaps, ZoomControl} from "react-yandex-maps";
import React from "react";

import styles from "./map.module.css"

export function YaMap() {
    return (
        <YMaps>
            <div className={styles.container}>
                <Map defaultState={{center: [56.841146, 60.596531], zoom: 15}} width={500} height={400}>
                    <Placemark geometry={[56.841146, 60.596531]}/>
                    <FullscreenControl/>
                    <ZoomControl/>
                    <TrafficControl options={{ float: 'right' }} />
                    <TypeSelector options={{ float: 'right' }} />
                </Map>
            </div>
        </YMaps>
    )
}

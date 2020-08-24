import {Link as ScrollLink} from "react-scroll/modules";
import React from "react";

import styles from "./upButton.module.css";

interface UpButtonProps {
    to: string;
}

export function UpButton({to}: UpButtonProps) {
    return (
        <ScrollLink href="" id="upbutton" className={"btn " + styles.btn_up} to={to} activeClass="active" smooth={true} offset={-50}>&#129045;</ScrollLink>
    )
}

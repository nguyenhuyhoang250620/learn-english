import React from "react";
import style from "./styles/Lable.component.scss";

export default function Label(props) {
    const {title, isRequired = false, normalWeight, ...rest} = props;
    return (
        <div className={style.textField} {...rest}>
            <span>{title}</span>
            {isRequired && <span className={style.redStar} style={{color:"red"}}>*</span>}
        </div>
    );
}

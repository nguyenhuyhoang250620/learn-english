import React, { useEffect, useRef, useState } from "react";

//Comp
import NotificationThread from "./NotificationThread";
import Search from "./Search";

// Styles
import styles from "./Styles/index.module.scss";
import { useSelector } from "react-redux";

function Notification() {

    const filterRef = useRef(null);

    return (
            <div className={styles.notificationContainer}>
                <div className={styles.thread}>
                    <NotificationThread filterRef={filterRef} />
                </div>
            </div>

    );
}

export default Notification;

/**
 * Empty component
 * @flow
 */

import React from "react";
import styles from './stylesheets/empty.module.sass'

// interface PropsType {
//     msg: String
// }
// props: PropsType


const Empty = (props) => {
    const {
        msg,
        retryCallback
    } = props

    return (
        <div className={styles.container}>
            {msg || "No data found"}
        </div>
    )
}

export default Empty


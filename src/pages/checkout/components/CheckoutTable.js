import React from 'react'
import styles from '../stylesheets/table.module.sass'

export default function CheckoutTable({items}) {
    return (
        <div className={styles.outbox}>
            {Object.keys(items).map(i => {
                    const {
                        item: {
                            imagePath,
                            title,
                            price
                        },
                        qty
                    } = items[i]

                    return (
                        <div key={i} className={styles.row}>
                            <div className={styles.pic}>
                                <img src={imagePath} alt=""/>
                            </div>
                            <div className={styles.title}>
                                {title}
                            </div>
                            <div className={styles.price}>
                                ${price} X {qty}
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}

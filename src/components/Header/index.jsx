import React from 'react'
import styles from './header.css'
import {Link} from 'react-router'

function Header() {
    return (
        <header className={styles.root}>
            <Link replace={true} className={styles.link} to="/">
                <h1 className={styles.logo}>
                    Reacttr
                </h1>
            </Link>
        </header>
    )
}

export default Header
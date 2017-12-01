import React, {PropTypes} from 'react'
import styles from './profile.css'

const propTypes = {
    username: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    location: PropTypes.string,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired
}

function Profile ({username, emailAddress, location, picture, displayName}) {
    return (
        <div className={styles.root}>
            {picture && (<img className={styles.avatar} src={picture} />)}
            <span className={styles.name}>{displayName}</span>
            <ul className={styles.data}>
                <li>
                    <span className="fa fa-user"></span> {username}
                </li>
                <li>
                    <span className="fa fa-envelope"></span> {emailAddress}
                </li>
                <li>
                    <span className="fa fa-map-marker"></span> {location}
                </li>
            </ul>
        </div>
    )
}

Profile.propTypes = propTypes

export default Profile
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import styles from './message.css'

const propTypes = {
    username: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    numRetweets: PropTypes.number.isRequired,
    numFavorites:PropTypes.number.isRequired,
    pressFavorite:PropTypes.bool.isRequired,
    pressRetweet:PropTypes.bool.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onRetweet: PropTypes.func.isRequired,
    onReplyTweet: PropTypes.func.isRequired
}

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pressFavorite: this.props.pressFavorite,
            pressRetweet: this.props.pressRetweet
        }

        this.onPressRetweet = this.onPressRetweet.bind(this)
        this.onPressFavorite = this.onPressFavorite.bind(this)
    }

    onPressFavorite() {
        this.props.onFavorite()
        this.setState({pressFavorite: true})
    }

    onPressRetweet() {
        this.props.onRetweet()
        this.setState({pressRetweet: true})
    }

    render() {
        let dateFormat = moment(this.props.date).fromNow()
        let userLink = `/user/${this.props.username}`

        return (
            <div className={styles.root}>
                <div className={styles.user}>
                    <Link to={userLink}>
                        <figure>
                            <img className={styles.avatar} src={this.props.picture}/>
                        </figure>
                    </Link>
                    <span className={styles.displayName}>{this.props.displayName}</span>
                    <span className={styles.username}>{this.props.username}</span>
                    <span className={styles.date}>{dateFormat}</span>
                </div>
                <h3>{this.props.text}</h3>
                <div className={styles.buttons}>
                    <div onClick={this.props.onReplyTweet} className={styles.icon}><span className="fa fa-reply"></span></div>
                    <div onClick={this.onPressRetweet} className={this.state.pressRetweet ? styles.rtGreen : ''}>
                        <span className="fa fa-retweet"></span>
                        <span className={styles.num}>{this.props.numRetweets}</span>
                    </div>
                    <div onClick={this.onPressFavorite} className={this.state.pressFavorite ? styles.favYellow : ''}>
                        <span className="fa fa-star"></span>
                        <span className={styles.num}>{this.props.numFavorites}</span>
                    </div>
                </div>
            </div>
        )
    }
}

Message.propTypes = propTypes

export default Message
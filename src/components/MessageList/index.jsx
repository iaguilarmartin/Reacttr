import React, { PropTypes } from 'react'

import Message from '../Message'
import styles from './message-list.css'

const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    userRetweets: PropTypes.arrayOf(PropTypes.string).isRequired,
    userFavorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRetweet: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onReplyTweet: PropTypes.func.isRequired
}

function MessageList({messages, onRetweet, onFavorite, onReplyTweet, userRetweets, userFavorites}) {
    return (
        <div className={styles.root}>
            {
                messages.map(msg => {
                    return <Message
                        key={msg.id}
                        text={msg.text}
                        picture={msg.picture}
                        displayName={msg.displayName}
                        username={msg.username}
                        date={msg.date}
                        numRetweets={msg.retweets}
                        numFavorites={msg.favorites}
                        onRetweet={() => onRetweet(msg.id)}
                        onFavorite={() => onFavorite(msg.id)}
                        onReplyTweet={() => onReplyTweet(msg.id, msg.username)}
                        pressFavorite={userFavorites.filter(fav => fav === msg.id).length > 0}
                        pressRetweet={userRetweets.filter(fav => fav === msg.id).length > 0}
                    />
                }).reverse()
            }
        </div>
    )
}

MessageList.propTypes = propTypes

export default MessageList
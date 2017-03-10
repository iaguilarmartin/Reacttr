import React, {Component, PropTypes} from 'react'
import firebase from 'firebase'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
}

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: Object.assign({}, this.props.user, {retweets: []}, {favorites: []}),
            openText: false,
            usernameToReply: '',
            messages: []
        }

        this.handleSendText = this.handleSendText.bind(this);
        this.handleCloseText = this.handleCloseText.bind(this);
        this.handleOpenText = this.handleOpenText.bind(this);
        this.handleRetweet = this.handleRetweet.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleReplyTweet = this.handleReplyTweet.bind(this);
    }

    componentWillMount() {

        firebase.database().ref('/retweetsByUser/' + this.state.user.uid).once('value').then(snapshot => {
            var retweets = [];

            snapshot.forEach(function(childSnapshot) {
                retweets.push(childSnapshot.val())
            });

            let user = Object.assign({}, this.state.user)
            user.retweets = retweets

            firebase.database().ref('/favoritesByUser/' + this.state.user.uid).once('value').then(snapshot => {
                var favorites = [];

                snapshot.forEach(function(childSnapshot) {
                    favorites.push(childSnapshot.val())
                });

                user.favorites = favorites

                this.setState({
                    user
                })

                const messagesRef = firebase.database().ref().child("messages")

                messagesRef.on('child_added', snapshot => {
                    this.setState({
                        messages: this.state.messages.concat(snapshot.val()),
                        openText: false
                    })
                })

                messagesRef.on('child_changed', snapshot => {

                    let messages = this.state.messages.map(msg => {
                        if (msg.id === snapshot.key) {
                            return snapshot.val()
                        } else {
                            return msg
                        }
                    })

                    this.setState({
                        messages
                    })
                });
            });
        });
    }

    handleSendText(event) {
        event.preventDefault();

        const messagesRef = firebase.database().ref().child("messages")
        const messageID = messagesRef.push()

        let newMessage = {
            id: messageID.key,
            text: event.target.text.value,
            picture: this.props.user.photoURL,
            displayName: this.props.user.displayName,
            username: this.props.user.email.split('@')[0],
            date: Date.now(),
            retweets: 0,
            favorites: 0
        }

        messageID.set(newMessage)
    }

    handleCloseText(event) {
        event.preventDefault();

        this.setState({openText: false})
    }

    handleOpenText (event) {
        event.preventDefault()

        this.setState({openText: true})
    }

    handleRetweet(msgId) {
        let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)
        if (alreadyRetweeted.length === 0) {
            let messages = this.state.messages.filter(msg => {
                if (msg.id === msgId) {
                    return msg
                }
                return msg
            })

            const message = messages[0]
            message.retweets++

            var updates = {};
            updates['/messages/' + msgId] = message;
            firebase.database().ref().update(updates)

            const retweetsRef = firebase.database().ref().child("retweetsByUser/" + this.state.user.uid)
            retweetsRef.push().set(msgId)

            let user = Object.assign({}, this.state.user)
            user.retweets.push(msgId)

            this.setState({
                user
            })
        }
    }

    handleFavorite(msgId) {
        let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId)
        if (alreadyFavorited.length === 0) {
            let messages = this.state.messages.filter(msg => {
                if (msg.id === msgId) {
                    return msg
                }
            })

            const message = messages[0]
            message.favorites++

            var updates = {};
            updates['/messages/' + msgId] = message;
            firebase.database().ref().update(updates)

            const favoritesRef = firebase.database().ref().child("favoritesByUser/" + this.state.user.uid)
            favoritesRef.push().set(msgId)

            let user = Object.assign({}, this.state.user)
            user.favorites.push(msgId)

            this.setState({
                user
            })
        }
    }

    handleReplyTweet(msgId, usernameToReply) {
        this.setState({
            openText: true,
            usernameToReply
        })
    }

    renderOpenText() {
        if (this.state.openText) {
            return (
                <InputText
                    onSendText={this.handleSendText}
                    onCloseText={this.handleCloseText}
                    usernameToReply={this.state.usernameToReply}
                />
            )
        }
    }

    render() {
        return (
            <div>
                <ProfileBar
                    picture={this.props.user.photoURL}
                    username={this.props.user.email.split('@')[0]}
                    onOpenText={this.handleOpenText}
                    onLogout={this.props.onLogout}
                />
                {this.renderOpenText()}
                <MessageList
                    messages={this.state.messages}
                    onRetweet={this.handleRetweet}
                    onFavorite={this.handleFavorite}
                    onReplyTweet={this.handleReplyTweet}
                    userFavorites={this.state.user.favorites}
                    userRetweets={this.state.user.retweets}
                />
            </div>
        )
    }
}

Main.propTypes = propTypes

export default Main
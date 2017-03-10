import React, {Component} from 'react'
import { HashRouter, Match } from 'react-router'
import 'normalize-css'
import firebase from 'firebase'

import styles from './app.css'
import Header from '../Header'
import Main from '../Main'
import Login from '../Login'
import Profile from '../Profile'

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }

        this.handleOnAuth = this.handleOnAuth.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
                console.log(user)
            } else {
                this.setState({user: null})
            }
        })
    }

    handleOnAuth() {
        const provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(`${result.user.email} ha iniciado sesion`)
        }).catch(error => {
            console.error(`Error: ${error.code}: ${error.message}`)
        })
    }

    handleLogout() {
        firebase.auth().signOut()
            .then(() => console.log("Te has desconectado correctamente"))
            .catch(() => console.error("Un error ocurrió"))
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                    <Match exactly pattern="/" render={() => {
                        if (this.state.user) {
                            return <Main onLogout={this.handleLogout} user={this.state.user}></Main>
                        } else {
                            return (
                                <Login
                                    onAuth={this.handleOnAuth}
                                />
                            )
                        }
                    }}/>

                    <Match pattern="/profile" render={() => (
                        <Profile
                            picture={this.state.user.photoURL}
                            username={this.state.user.email.split('@')[0]}
                            displayName={this.state.user.displayName}
                            location={this.state.user.location}
                            emailAddress={this.state.user.email}
                        />
                    )} />

                    <Match pattern="/user/:username" render={({ params }) => (
                        <Profile
                            username={params.username}
                            displayName={params.username}
                        />
                    )} />

                </div>
            </HashRouter>
        )
    }
}

export default App
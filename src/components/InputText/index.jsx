import React, {PropTypes} from 'react'
import styles from './input-text.css'

const propTypes = {
    usernameToReply: PropTypes.string.isRequired,
    onCloseText: PropTypes.func.isRequired,
    onSendText: PropTypes.func.isRequired
}

function InputText({usernameToReply, onCloseText, onSendText}) {
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSendText}>
                <textarea autoFocus className={styles.text} defaultValue={usernameToReply ? `@${usernameToReply} ` : ''} name="text">
                </textarea>
                <div className={styles.buttons}>
                    <button className={styles.close} onClick={onCloseText}>Cerrar</button>
                    <button className={styles.send} type="submit">Enviar</button>
                </div>
            </form>
        </div>
    )
}

InputText.propTypes = propTypes

export default InputText
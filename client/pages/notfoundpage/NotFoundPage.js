import React from 'react'

export default () => {
    const style = {
        wrapper : {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column',
            minHeight: '80vh'
        },
        button : {
            padding: '10px',
            width: '200px',
            borderRadius: '50px',
            background: '#51395b',
            color: '#fff',
            fontFamily: 'futura pt',
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
        }
    }

    return (
        <div style={style.wrapper}>
            <img src="./images/notfound.png" />
            <a href="/" style={style.button}>HOME PAGE</a>
        </div>
    )
}

import React from 'react'
import { Detector } from 'react-detect-offline'
import '../css/checkConnection.css'

function CheckConnection(props) {
    return (
        <div>
            <Detector render={({ online }) => (
                online ? props.children :
                    <div class="offline">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <div>
                            <h1>No Connection</h1>
                            <h6>Please Check your Internet Connection</h6>
                        </div>
                    </div>
            )} />
        </div>
    )
}

export default CheckConnection
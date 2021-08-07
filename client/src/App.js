import React, {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import MessageCreator from "./components/MessageCreator";

const SOCKET_URL = "/ws-message";

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const onConnected = () => {
            console.log("Connected websocket")
            console.log("Subscribe on /topic/message");
            client.subscribe('/topic/message', function (msg) {
                console.log("Received message: ", JSON.parse(msg.body))
                if (msg.body) {
                    const jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        setMessages(prev => [...prev, jsonBody.message])
                    }
                }
            });
        }

        const onDisconnected = () => {
            console.log("Disconnected websocket!")
        }

        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });

        client.activate();
    }, [])

    return (
        <div className="App">
            <MessageCreator/>
            <ul>
                {messages.map((m, index) => (
                    <li key={index}>{m}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

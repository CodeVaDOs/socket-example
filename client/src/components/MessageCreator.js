import React, {useState} from 'react';

const MessageCreator = () => {
    const [formData, setFormData] = useState({
        message: ''
    })

    const handleInput = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const sendMessage = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/send', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
        })
    }

    return (
        <form onSubmit={sendMessage}>
            <input onChange={handleInput} placeholder="Enter message" name="message" type="text"/>
            <button>Send</button>
        </form>
    );
};

export default MessageCreator;
import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = async (event) => {
        if (event.key === 'Enter' && input.trim() !== '') {
            const userMessage = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);
            setInput('');

            const response = await fetch('https://techvedas-backend-1.onrender.com/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `msg=${encodeURIComponent(input)}`,
            });
            const data = await response.json();
            const botMessage = { sender: 'bot', text: data.response };
            setMessages([...messages, userMessage, botMessage]);
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div
                className="bg-blue-500 text-white p-3 rounded-full cursor-pointer text-2xl"
                onClick={toggleChatbot}
            >
                💬
            </div>
            {isOpen && (
                <div className="w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
                        <h4 className="text-lg">Chatbot</h4>
                        <button onClick={toggleChatbot} className="text-white">✖</button>
                    </div>
                    <div className="flex-grow p-3 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        className="border-t border-gray-300 p-2"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleSendMessage}
                    />
                </div>
            )}
        </div>
    );
};

export default Chatbot;
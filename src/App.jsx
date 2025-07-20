import './App.css';
import React, { useRef, useState } from 'react';
import '@material/web/button/filled-button';
import '@material/web/textfield/filled-text-field';
import { geminiRun } from './gemini'; // gemini.jsからインポート

function App() {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]); // メッセージのステートを追加

  const onButtonClick = async () => {
    if (!inputRef.current) { return; }

    const inputText = inputRef.current.value;
    const response = await geminiRun(inputText);
    
    // 新しいメッセージを追加
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, type: 'user' }, // ユーザーのメッセージ
      { text: response, type: 'gemini' }  // Geminiの応答
    ]);

    // 入力フィールドをクリア
    inputRef.current.value = '';
  }

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <md-filled-text-field
            id="input"
            type="textarea"
            rows="5"
            ref={inputRef}
            className="message-input"
          />
          <md-filled-button 
            type="button" 
            id="button" 
            className="send-button" 
            onClick={onButtonClick}
          >
            Send
          </md-filled-button>
        </div>
      </div>
    </div>
  );
}

export default App;

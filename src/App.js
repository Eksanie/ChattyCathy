import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>


    <header>  

    <img src= "http://cdn.bleacherreport.net/images_root/slides/photos/000/462/711/62wash_display_image.jpg?1287961269"/>
    
    Chatter 
    </header>
  
    <TextInput onSend={m=> console.log(m)} />

  </main>
}

function TextInput(props){
  var [text, setText] = useState('')
  return <div className = "text-input">
  <input value = {text} 
    placeholder = "write your message"
    onChange = {e => setText(e.target.value)}
  
  />
  <button onClick={() => {
  props.onSend(text)
  setText('')
  }}>
  SEND
  </button>

  </div>
}

export default App;

import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react';
import Alert from './components/Alert';  

function App() {
    const [mode, setMode] = useState('light')  //this shows whether dark mode is on or not
    const [alert, setAlert] = useState('null')
    const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 1500);
    }

    const toggleMode = ()=>{
      setInterval(() => {
        document.title = 'Intall TextUtils Now';
      }, 1000);
      setInterval(() => {
        document.title = 'TextUtils Is Amazing';
      }, 2000);
    if(mode==='light'){
    setMode('dark')
    document.body.style.backgroundColor = '#042743';
    showAlert('Dark Mode Has Been Enabled', 'success');
    document.title = 'TextUtils - Dark Mode';
    }
    else{
    setMode('light')
    document.body.style.backgroundColor = 'white';
    showAlert('Light Mode Has Been Enabled','success')
    document.title = 'TextUtils - Light Mode';
    }
    }
return (
<>
    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
    {/* <Navbar/> */}
    <Alert alert={alert}/>
  <div className="container">
    <TextForm showAlert={showAlert} heading="Enter The Text To Analyze" mode={mode}/>
    
  </div>
</>
  );
}

    export default App;










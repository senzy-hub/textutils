import React, { useState } from 'react'
export default function TextForm(props) {
    const [text, setText] = useState('');


    const handleRemoveDash = () => {
        let newText = text.replace(/-/g, ' ');
        setText(newText);

    };


    const handleDash = () => {
        let newText = text.trim().split(/\s+/).join('-');
        setText(newText);

    };

    const handleUpClick = () => {

        let newText = text.toUpperCase();
        setText(newText)


    }
    const handleLoClick = () => {

        let newText = text.toLowerCase();
        setText(newText)


    }
    const handleOnChange = (event) => {

        setText(event.target.value);
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox")
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Text Copied!", "success");
    }
    const HandleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra Spaces Removed", "success");
    }
    const HandleClearClick = (event) => {
        setText(event.target.value)

    }
    return (
        <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
            <h1 className='my-3'>{props.heading}</h1>
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>
            <div className="container my-3 d-flex gap-2">
                <button disabled={text.length === 0} onClick={handleUpClick} type="button" className="btn btn-primary">Convert To UpperCase</button>
                <button disabled={text.length === 0} onClick={handleLoClick} type="button" className="btn btn-primary">Convert To LowerCase</button>
                <button disabled={text.length === 0} onClick={HandleExtraSpaces} type="button" className="btn btn-warning">Remove Extra Spaces</button>
                <button disabled={text.length === 0} onClick={handleDash} type="button" className="btn btn-secondary">Add Dash To Each Word</button>
                <button disabled={text.length === 0} onClick={handleRemoveDash} type="button" className="btn btn-secondary">Remove All Dashes</button>
                <button disabled={text.length === 0} onClick={HandleClearClick} type="button" className="btn btn-danger">Clear Text</button>
                <button disabled={text.length === 0} onClick={handleCopy}type="button"className="btn btn-success white-border">Copy Text</button>

            </div>

            <h2>Your Text Summary</h2>
            <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Words And {text.length} Characters</p>

            <h2>Preview</h2>
            <p>{text.length > 0 ? text : "Nothing To Preview!"}</p>
            <nav aria-label="Page navigation example">
                
                
                <div className="user-select-none"><center>ENJOY💖</center></div>
                <label htmlFor="customRange1" className="form-label"></label>
                <input type="range" className="form-range" id="customRange1"></input>

            </nav>
        </div>
    )
}   

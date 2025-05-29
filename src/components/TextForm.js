import React, {useState} from 'react'
export default function TextForm(props) {
    const [text, setText] = useState('');
    const handleUpClick = ()=>{
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted To UpperCase!", "success");
        
    }
    const handleLoClick = ()=>{
        // console.log("Uppercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted To LowerCase!", "success");
        
    }
       const handleOnChange = (event)=>{
        console.log("On Change");
        setText(event.target.value);
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox")
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text Copied!", "success");
    }
    const HandleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra Spaces Removed", "success");

        
    }
    const HandleClearClick = (event)=>{
            // console.log('On Change');
            setText(event.target.value)
            props.showAlert("Text Cleared", "success");
        }
    return (
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
        <h1>{props.heading}</h1>
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
        <div className="container my-3 d-flex gap-2">
        <button onClick={handleUpClick} type="button" className="btn btn-primary">Convert To UpperCase</button>
        <button onClick={handleLoClick} type="button" className="btn btn-secondary">Convert To LowerCase</button>
        <button onClick={handleCopy} type="button" className="btn btn-success">Copy Text</button>
        <button onClick={HandleExtraSpaces} type="button" className="btn btn-success">Remove Extra Spaces</button>
        <button onClick={HandleClearClick} type="button" className="btn btn-warning">Clear Text</button>
</div>

        {/* <div className="container my-2"> */}
        <h2>Your Text Summary</h2>
        <p>{text.split(" ").length} And {text.length}</p>
        <p>{0.008 * text.split(" ").length} Minutes Read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter SomeThing Above To Preview It Here"}</p>
        </div>
        
        // </div>

    
)
}   

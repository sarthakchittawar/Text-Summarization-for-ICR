import { React, useEffect, useState } from "react";
import { TextField, Typography, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button"
import axios from 'axios';

function App() {
  const [textVal,editText] = useState("");
  const [dispText, newDisp] = useState("");
  const [isLoading, setLoading] = useState(false);

  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  async function sub(){
    setLoading(true);
    try{
      const res = await axios.post('http://localhost:5000/summarize',{text:textVal});
      if(res.status==200){
        newDisp(res.data);
        // editText("");
        setLoading(false);
      }
    }catch(err){
      alert(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <h1 align = "center">Text Summarizer</h1>
      <p style={{left:"12.5vw", top: "10vh"}}>
        <h2 style={{ position:"absolute", left: "12.5vw", top: "10vh"}}>Input Text</h2>
        <TextField id="inText" variant="outlined" onChange={(val) => { editText(val.target.value) }} label="Text to Summarize"  value={ textVal } size="large" multiline rows={8} sx={{
          width : "75vw",
          left: "12.5vw",
          top: "10vh"
        }} />
        <Button type="submit" disabled = { isLoading | !textVal || textVal.trim()==""} variant="contained" sx={{
          position: "absolute",
          left:"12.5vw",
          top:"48vh"
        }} onClick={()=>{sub()}}>Submit</Button>
        <Button type="submit" disabled = { isLoading | !textVal || textVal==""} variant="contained" sx={{
          position: "absolute",
          left:"75vw",
          top:"15vh"
        }} onClick={()=>{editText("")}}>Clear Input</Button>
        <Button type="submit" disabled = { isLoading | !dispText || dispText==""} variant="contained" sx={{
          position: "absolute",
          left:"70vw",
          top:"50vh"
        }} onClick={()=>{newDisp("")}}>Clear Summary</Button>
      </p>
      <p style={{position:"absolute", left:"12.5vw", top:"50vh", width:"75vw"}}>
        {
          isLoading==false ?
            <>
              <h2>Output Summary</h2>
              {dispText.split("\n").length != 0 ?
                <>{ dispText.split("\n").map((line,index) => (
                  <>{ line }<br /></>
                )) }
                </>
                :
                  {dispText}
              }
            </>
          :
            <div style={{color:"orangered"}}>
              <CircularProgress color='inherit' />
              <Typography color="orangered">Loading</Typography>
            </div>
        }
        
      </p>
      <p style={{position:"absolute", left:"40vw", top:"50vh", width:"75vw"}}>
        {
          isLoading==false ?
          <>
            No. of words in given text: {(textVal.trim() === "")? 0 : textVal.trim().split(/\s+/).length} <br/>
            No. of words in summary: {(dispText.trim() === "")? 0 :dispText.trim().split(/\s+/).length}
          </>
          :<></>
        }
      </p>
    </>
  );
}

export default App;

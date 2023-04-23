# Frontend Documentation

__Code is in the UserInterface branch, inside the src folder, in the App.js file.__

## State Variables
```js
const [textVal,editText] = useState();
const [dispText, newDisp] = useState("");
const [isLoading, setLoading] = useState(false);
```
These are the state variables used in the code.
* __textVal__ : Used to store the value of the inputted text.
* __dispText__: Used to store the value of the summarized text.
* __isLoading__: A flag variable - set to 1 when making the call to the backend, and shows the loader. It is reset to 0 when the backend returns the summarized text.

## Axios Headers
```js
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
```
Sets the content-type used in the API calls to jsons (as was required by the backend), and sets the CORS permissions to allow all requests.

## Backend Call Function
```js
async function sub(){
  setLoading(true);
  try{
    const res = await axios.post('http://localhost:5000/summarize',{text:textVal});
    if(res.status==200){
      newDisp(res.data);
      setLoading(false);
    }
  }catch(err){
    alert(err.message);
    setLoading(false);
  }
}
```
Sets the `isLoading` variable to true, to signify that we are sending the API call. Then sends an API request to the backend, which is currently hosted on `http://localhost:5000/summarize`.
* __Headers__: Set before. Check previous section.
* __Body__: a json with the attribute text set to the value textVal (which, if you remember, is our input text).
* __Response__: When the API sends a response, it sets the `isLoading` variable to false, signifying to the user that the backend sent a response. If the status is 200, we set the `dispText` variable to the acquired summary. If not, we display the error message returned as an alert.

## The frontend
* The headers
```js
<h1 align = "center">Text Summarizer</h1>
      <p style={{left:"12.5vw", top: "10vh"}}>
        <h2 style={{ position:"absolute", left: "12.5vw", top: "10vh"}}>Input Text</h2>
```

* The text field to get the input text:
```js
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
```
The value of the textfield on changing edits the `textVal` value, as depicted by the `editText` function.<br>
The value displayed in the Text Field is permanently set to `textVal`.<br>
The `sub()` function is called on clicking the submit button.

* The display of the summarized text.
```js
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
```
Checks if the summary is loading using the conditional. If not, it displays the value in `dispText`. (We need to split `dispText` based on `\n` as HTML doesn't recognize it as a line break, and we need to manually add `<br>` in those places).<br>
If backend is loading, we display a circular progress loader with a loading text to depict to the user that the summary is loading.

* Clear Input and Clear Summary
```js
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
```
Clears the input text/output text on clicking the respective buttons. The `Clear Input` button is disabled during loading and when the input is null, and the `Clear Summary` button is disabled during loading and when the summary is null.

* Display size of Input Text and Summary
```js
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
```
The number of words in the user-given text is displayed as well as the number of words of its summary. Thus, the user can compare the 2 values and thus understand the degree of summarization.
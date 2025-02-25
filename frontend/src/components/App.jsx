import React, {useState} from "react";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [jsonOutput, setJsonOutput] = useState("");

    const handleJsonInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const formatJson = async () => {
        try {
            const response = await axios.post("http://localhost:8000/format-json", {
                json_string: jsonInput,
            });
            setJsonOutput(response.data.formatted_json);
        } catch (error) {
            alert("Invalid JSON or Server Error");
        }
    };

    return (
        <div
            className="container-fluid"
            style={{
                backgroundColor: "#026997", // Light gray background
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div className="row">
                <div className="col s12 m6">
                    <h5 style={{color: "#ffffff"}}>Unformatted JSON</h5>
                    <textarea
                        className="textbox"
                        value={jsonInput}
                        onChange={handleJsonInputChange}
                        style={{
                            width: "100%",
                            height: "80vh",
                            backgroundColor: "#abd2fa",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                        placeholder="Enter unformatted JSON here"
                    />
                </div>

                <div className="col s12 m6">
                    <h5 style={{color: "#ffffff"}}>Formatted JSON</h5>
                    <textarea
                        className="textbox"
                        value={jsonOutput}
                        readOnly
                        style={{
                            width: "100%",
                            height: "80vh",
                            backgroundColor: "#abd2fa", // Light blue background for formatted JSON
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                        placeholder="Formatted JSON will appear here"
                    />
                </div>
            </div>
            <div className="center-align" style={{marginTop: "20px"}}>
                <button className="btn waves-effect waves-light green darken-2" onClick={formatJson}>
                    Format JSON
                </button>
            </div>
        </div>
    );
}

export default App;

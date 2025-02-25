import { useState } from "react";
import axios from "axios";

const JsonFormatter = () => {
    const [inputJson, setInputJson] = useState("");
    const [formattedJson, setFormattedJson] = useState("");

    const formatJson = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/format-json", { json_string: inputJson });
            setFormattedJson(response.data.formatted_json);
        } catch (error) {
            setFormattedJson("Invalid JSON");
        }
    };

    return (
        <div className="container">
            <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Enter unformatted JSON here..."
            />
            <button onClick={formatJson}>Format JSON</button>
            <pre>{formattedJson}</pre>
        </div>
    );
};

export default JsonFormatter;

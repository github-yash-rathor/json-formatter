import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
        setError('');
    };

    const formatJson = () => {
        if (!jsonInput.trim()) {
            setError('Please enter JSON to format');
            setJsonOutput('');
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonInput);
            const formattedJson = JSON.stringify(parsedJson, null, 2);
            setJsonOutput(formattedJson);
            setError('');
        } catch (err) {
            setError('Invalid JSON format');
            setJsonOutput('');
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>JSON Formatter</h1>
                <p>Paste your JSON and format it with a click!</p>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="input-section">
                            <h5>Input JSON</h5>
                            <textarea
                                className="json-textarea"
                                onChange={handleInputChange}
                                placeholder="Enter unformatted JSON here..."
                                value={jsonInput}
                            />
                        </div>
                    </div>

                    <div className="col s12 m6">
                        <div className="output-section">
                            <h5>Formatted JSON</h5>
                            <textarea
                                className="json-textarea"
                                value={jsonOutput}
                                readOnly
                                placeholder="Formatted JSON will appear here..."
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="button-container">
                    <button
                        className="format-button"
                        onClick={formatJson}
                    >
                        Format JSON
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;

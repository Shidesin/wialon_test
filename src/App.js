import React from "react";
import './App.css';
import {CoordinateFormComponent} from "./СoordinateFormComponent/СoordinateFormComponent";
import {MapBox} from "./MapBox/MapBox";

function App() {
    return (
        <div className="App">
            <CoordinateFormComponent/>
            <MapBox/>
        </div>
    );
}

export default App;
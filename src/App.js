import React from "react";
import './App.css';
import {CoordinateFormComponent} from "./СoordinateFormComponent/СoordinateFormComponent";
import {MapBox} from "./MapBox/MapBox";
import {PopupCustom} from "./common/component/Popup/PopupCustom";

function App() {
    return (
        <div className="App">
            <PopupCustom />
            <CoordinateFormComponent/>
            <MapBox/>
        </div>
    );
}

export default App;
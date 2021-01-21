import React from "react";
import './App.css';
import {CoordinateFormComponent} from "./СoordinateFormComponent/СoordinateFormComponent";
import {PopupCustom} from "./Popup/PopupCustom";
import {ContentBox} from "./ContentBox/ContentBox";

function App() {
    return (
        <div className="App">
            <PopupCustom />
            <CoordinateFormComponent/>
            <ContentBox />
        </div>
    );
}

export default App;
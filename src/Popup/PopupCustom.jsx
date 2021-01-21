import React from 'react';
import Popup from 'react-popup';
import 'react-popup/style.css'


export const createPopupWindow = (coordinate, address, date, distance) => {

    Popup.create({
        title: 'Данные о маршруте',
        content:
            <div>
                <div>
                    Координаты:
                    <div>
                        lat:{coordinate[0]}, lng: {coordinate[1]}.
                    </div>
                </div>
                <div>Адрес: {address}.</div>
                <div>Дата: {date}.</div>
                <div>Дистанция от предыдущей точки: {distance}.</div>
            </div>
    });
}

export const PopupCustom = () => {

    return (
        <Popup
            className="mm-popup"
            btnClass="mm-popup__btn"
            closeBtn={true}
            // closeHtml={null}
            // defaultOk="Ok"
            // defaultCancel="Cancel"
            // wildClasses={false}
            escToClose={true}
        />
    )
}
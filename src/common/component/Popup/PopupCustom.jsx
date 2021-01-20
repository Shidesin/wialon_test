import React from 'react';
import Popup from 'react-popup';
import '../../../../node_modules/react-popup/style.css'


export const createPopupWindow = (coordinate, address, date, distance, duration) => {

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
                <div>Ориентировочное время в пути: {duration}.</div>
            </div>

        ,
        // buttons: {
        //     left: [{
        //         text: 'Cancel',
        //         className: 'danger',
        //         action: function () {
        //             Popup.alert('You pressed the Cancel btn');
        //
        //             /** Close this popup. Close will always close the current visible one, if one is visible */
        //             Popup.close();
        //         }
        //     }],
        //     right: [{
        //         text: 'Alt',
        //         key: 'ctrl+enter',
        //         action: function () {
        //             // Passing true as the second argument to the create method
        //             // displays it directly, without interupting the queue.
        //             Popup.create({
        //                 title: null,
        //                 content: 'I was configured to display right away, without affecting the queue. Closing this will display the previously visible popup.',
        //                 buttons: {
        //                     left: ['cancel'],
        //                     right: []
        //                 }
        //             }, true);
        //         }
        //     }, {
        //         text: 'Save',
        //         className: 'success',
        //         action: function () {
        //             Popup.alert('You pressed the Save btn');
        //
        //             /** Close this popup. Close will always close the current visible one, if one is visible */
        //             Popup.close();
        //         }
        //     }]
        // }
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
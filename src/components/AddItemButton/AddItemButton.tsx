import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus
} from '@fortawesome/free-solid-svg-icons';

interface AddButtonActionTypes {
    changeOpenModal(openModal:boolean, editTask:string): void,
}

/** 
  * Кнопка открытия модального окна добавления задачи
*/
const AddItemButton = ({changeOpenModal}:AddButtonActionTypes) => 
    <div className="add-item-button"
         onClick={() => changeOpenModal(true, '')}
    >
        <FontAwesomeIcon icon={faPlus} />
    </div>

export default AddItemButton;

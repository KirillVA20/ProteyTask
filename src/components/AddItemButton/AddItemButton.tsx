import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus
} from '@fortawesome/free-solid-svg-icons';

interface AddButtonActionTypes {
    changeOpenModal(openModal:boolean, editTask:string): void,
}

const AddItemButton = (props:AddButtonActionTypes) => 
    <div className="add-item-button"
         onClick={() => props.changeOpenModal(true, '')}
    >
        <FontAwesomeIcon icon={faPlus} />
    </div>

export default AddItemButton;

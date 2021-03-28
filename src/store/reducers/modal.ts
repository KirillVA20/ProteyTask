import {ModalActionTypes, ModalTypes} from '../../types';

interface InitialStateTypes {
    openModal: boolean,
    editTask:string,
};

const initialState:InitialStateTypes = {
    openModal: false,
    editTask: ''
};

export default function modal(state=initialState, action:ModalActionTypes):InitialStateTypes {
    switch (action.type) {
        case ModalTypes.CHANGE_OPEN_MODAL :
            return {
                ...state,
                openModal: action.payload.openModal,
                editTask: action.payload.editTask,
            }
        
        default:
            return state;   
    }
}
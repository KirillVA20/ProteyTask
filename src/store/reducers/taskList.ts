import {TaskListTypes, ItemsTypes, TaskListActionTypes} from '../../types';

const initialState:TaskListTypes = {
    taskData: {},
    orderData: []
}

export default function taskList(state=initialState, action:TaskListActionTypes):TaskListTypes {
    switch (action.type) {
        case ItemsTypes.UPDATE_TASK_LIST : {
            return {...action.taskList}
        }

        case ItemsTypes.UPDATE_TASK_POSITION : {
            return {
                ...state,
                orderData: action.orderData
            }
        }

        default:
            return state;
    }
}
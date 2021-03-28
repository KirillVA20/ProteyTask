import {ItemsTypes, TaskListTypes, TaskTypes, ModalTypes} from '../../types';

export const deleteItemAction = (itemId:string) => ({
    type: ItemsTypes.DELETE_ITEM,
    itemId
});

export const getTaskListAction = () => ({
    type: ItemsTypes.GET_TASK_LIST
});

export const changeOpenModal = (openModal:boolean, editTask:string) => ({
    type: ModalTypes.CHANGE_OPEN_MODAL,
    payload: {
        openModal,
        editTask
    }
});

export const addTaskAction = (taskData:TaskTypes) => ({
    type: ItemsTypes.ADD_ITEM,
    taskData
});

export const editTaskAction = (taskData:TaskTypes) => ({
    type: ItemsTypes.EDIT_TASK,
    taskData
});

export const updateTaskList = (taskList:TaskListTypes) => ({
    type: ItemsTypes.UPDATE_TASK_LIST,
    taskList
});

export const updateTaskDone = (itemId:string) => ({
    type: ItemsTypes.UPDATE_TASK_DONE,
    itemId
});

export const changeTaskPosition = (itemId:string, position:string) => ({
    type: ItemsTypes.CHANGE_TASK_POSITION,
    itemId,
    position
});


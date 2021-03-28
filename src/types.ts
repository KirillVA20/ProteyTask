export enum ItemsTypes {
    ADD_ITEM = 'ADD_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    EDIT_TASK = 'EDIT_TASK',
    CHANGE_TASK_POSITION = 'CHANGE_TASK_POSITION',
    UPDATE_TASK_POSITION = 'UPDATE_TASK_POSITION',
    GET_TASK_LIST = 'GET_TASK_LIST',
    GET_TASK_LIST_SUCCESS = 'GET_TASK_LIST_SUCCESS',
    LOAD_ITEM_START = 'LOAD_REQUEST',
    LOAD_SUCCESS = 'LOAD_SUCCESS',
    LOAD_FAILURE = 'LOAD_FAILURE',
    UPDATE_TASK_LIST = 'UPDATE_TASK_LIST',
    UPDATE_TASK_DONE = 'UPDATE_TASK_DONE'
}

export interface TaskTypes {
    id: string,
    name:string,
    description:string,
    done:boolean,
    ordinalNumber:number
}

export interface TaskDataTypes {
    [key: string]: TaskTypes
}

export interface TaskListTypes {
    taskData: {
        [key: string]: TaskTypes
    },
    orderData: String[],
}

export interface TaskListActionTypes {
    type: string,
    taskList: TaskListTypes,
    orderData: String[]
}

export interface StoreTypes {
    taskList: TaskListTypes,
    modal: ModalActionDataTypes
}

export interface ModalActionDataTypes {
    openModal: boolean,
    editTask: string
}

export interface ModalActionTypes {
    type: string,
    payload: ModalActionDataTypes,
}

export enum ModalTypes {
    CHANGE_OPEN_MODAL = 'CHANGE_OPEN_MODAL'
}

import {all, takeLatest} from 'redux-saga/effects';
import {ItemsTypes} from '../../types';
import {
    getTaskList,
    deleteItem,
    updateTaskDone,
    addTask,
    editTask,
    changeTaskPosition
} from './sagas';

export default function* rootSaga() {
    yield all([
        takeLatest(ItemsTypes.GET_TASK_LIST , getTaskList),
        takeLatest(ItemsTypes.ADD_ITEM , addTask),
        takeLatest(ItemsTypes.DELETE_ITEM, deleteItem),
        takeLatest(ItemsTypes.UPDATE_TASK_DONE , updateTaskDone),
        takeLatest(ItemsTypes.CHANGE_TASK_POSITION , changeTaskPosition),
        takeLatest(ItemsTypes.EDIT_TASK , editTask)
    ])
}
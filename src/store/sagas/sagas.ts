import {put, call} from 'redux-saga/effects';
import {TaskListTypes, TaskTypes} from '../../types';
import {updateTaskList} from '../actions/actions';
import {
    LSgetTaskList, 
    LSremoveTaskItem, 
    LSaddTaskItem,
    LSdoneTaskItem,
    LSChangeTaskPosition,
    LSEditTaskItem
} from '../api/LocalStorageApi';

interface SagasTypes {
    type: string,
    itemId?: string,
    taskData?: TaskTypes,
    position?: string
}

export function* getTaskList() {
    try {
        const taskList:TaskListTypes = yield call(LSgetTaskList);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}

export function* deleteItem({itemId}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSremoveTaskItem, itemId);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}

export function* updateTaskDone({itemId}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSdoneTaskItem, itemId);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}

export function* addTask({taskData}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSaddTaskItem, taskData);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}

export function* editTask({taskData}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSEditTaskItem, taskData);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}

export function* changeTaskPosition({itemId, position}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSChangeTaskPosition, itemId, position);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошбика');
    }
}
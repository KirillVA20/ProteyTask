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

/**
 * Сага получения данных с localStorage и перезаписывание их в хранилище
 */
export function* getTaskList() {
    try {
        const taskList:TaskListTypes = yield call(LSgetTaskList);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}

/**
 * Сага на удаление задачи из объекта данных localStorage 
 * и перезаписывание изменений в хранилище
 * @param {string} itemId - id удаляемой задачи
*/
export function* deleteItem({itemId}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSremoveTaskItem, itemId);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}

/**
 * Сага на обновления статуса выполнения задачи в объекта данных localStorage 
 * и перезаписывание изменений в хранилище
 * @param {string} itemId - id задачи в которой будет менятся статус
*/
export function* updateTaskDone({itemId}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSdoneTaskItem, itemId);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}

/**
 * Сага на добавление задачи в объект данных localStorage 
 * и перезаписывание изменений в хранилище
 * @param {Object} taskData - объект с данными задачи
*/
export function* addTask({taskData}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSaddTaskItem, taskData);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}

/**
 * Сага на редактирования задачи в объекте данных localStorage 
 * и перезаписывание изменений в хранилище
 * @param {Object} taskData - объект с данными задачи
*/
export function* editTask({taskData}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSEditTaskItem, taskData);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}

/**
 * Сага на изменение позиции задачи в объекте данных localStorage 
 * и перезаписывание изменений в хранилище
 * @param {Object} taskData - объект с данными задачи
*/
export function* changeTaskPosition({itemId, position}:SagasTypes) {
    try {
        const taskList:TaskListTypes = yield call(LSChangeTaskPosition, itemId, position);
        yield put(updateTaskList(taskList));
    } catch {
        console.log('ошибка');
    }
}
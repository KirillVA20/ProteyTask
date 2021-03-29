import {ItemsTypes, TaskListTypes, TaskTypes, ModalTypes} from '../../types';

/** 
  * Событие удаления задачи
  * @param {string} itemId - id задачи
*/
export const deleteItemAction = (itemId:string) => ({
    type: ItemsTypes.DELETE_ITEM,
    itemId
});


/** 
  * Событие получения списка задач с localStorage
*/
export const getTaskListAction = () => ({
    type: ItemsTypes.GET_TASK_LIST
});


/** 
  * Событие на октрытие/закртие модального окна редактирования/создания задачи
  * @param {string} openModal - состояние активности модального окна
  * @param {string} editTask - id редактируемой задачи задачи
*/
export const changeOpenModal = (openModal:boolean, editTask:string) => ({
    type: ModalTypes.CHANGE_OPEN_MODAL,
    payload: {
        openModal,
        editTask
    }
});

/** 
  * Событие создания новой задачи
  * @param {string} taskData - объект с данными новой задачи
*/
export const addTaskAction = (taskData:TaskTypes) => ({
    type: ItemsTypes.ADD_ITEM,
    taskData
});

/** 
  * Событие редактирования задачи
  * @param {string} taskData - новый объект с данными задачи
*/
export const editTaskAction = (taskData:TaskTypes) => ({
    type: ItemsTypes.EDIT_TASK,
    taskData
});

/** 
  * Событие обновляющее список задач в хранилище store
  * @param {object} taskList - обновленный объект с задачами, 
  * полученный с localstorage
*/
export const updateTaskList = (taskList:TaskListTypes) => ({
    type: ItemsTypes.UPDATE_TASK_LIST,
    taskList
});

/** 
  * Событие обновляющее статус выполнения задачи
  * @param {string} itemId - id задачи
*/
export const updateTaskDone = (itemId:string) => ({
    type: ItemsTypes.UPDATE_TASK_DONE,
    itemId
});

/** 
  * Событие изменения позиции задачи в списке
  * @param {string} itemId - id задачи
  * @param {string} position - направление изменения позиции
*/
export const changeTaskPosition = (itemId:string, position:string) => ({
    type: ItemsTypes.CHANGE_TASK_POSITION,
    itemId,
    position
});


import {TaskTypes, TaskListTypes} from '../../types';

/** 
  * Получение списка задач и их очереди из localStorage
*/
export function LSgetTaskList() {
    //Проверка на отсутсвие и некорретность структуры объекта с данными
    //если условия выполняются, перезаписываем объект на новый
    if (!localStorage.getItem('TaskListData') || !checkCorrectDataStructure()) 
        setTaskListDataInLS();
    
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData'));

    return Promise.resolve(TaskListData);
}


/** 
  * Удаление задачи из данных в localStorage
*/
export const LSremoveTaskItem = (taskId:string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;
    
    //Получаем расположение задачи в массиве очереди
    const TASK_INDEX = TaskListData.orderData.indexOf(taskId);

    //Удаляем задачу из объекта задач
    delete taskDataObj[taskId];
    //Удаляем id задачи из массива с очередью
    TaskListData.orderData.splice(TASK_INDEX, 1);
    //Прозводим перезапись порядкового номера во всех задачах
    taskDataObj = changeOrdinalNumbers(TaskListData);
    //Перезаписываем объект с данными в localStorage
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    //Возвращаем объект с данными саге
    return Promise.resolve(TaskListData);
} 


/** 
  * Изменение состояния выполнения задачи в localStorage
  * @param {string} taskId - id задачи
*/
export const LSdoneTaskItem = (taskId:string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData[taskId];

    //Перезаписываем переменную done в задаче
    taskDataObj.done = !taskDataObj.done;
    //Перезаписываем объект с данными в localStorage
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    //Возвращаем объект с данными саге
    return Promise.resolve(TaskListData);
} 

/** 
  * Добавление новой задачи в localStorage
  * @param {Object} taskData - объект данных задачи
*/
export const LSaddTaskItem = (taskData:TaskTypes) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;

    //Вставляем id задачи в массив очереди
    TaskListData.orderData.splice(taskData.ordinalNumber, 0, taskData.id);
    //Вставляем полученный объект в список задач
    taskDataObj[taskData.id] = {...taskData};
    //Прозводим перезапись порядкового номера во всех задачах
    taskDataObj = changeOrdinalNumbers(TaskListData);
    //Перезаписываем объект с данными в localStorage
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    //Возвращаем объект с данными саге
    return Promise.resolve(TaskListData);
} 


/** 
  * Редактирование задачи в localStorage
  * @param {Object} taskData - объект данных задачи
*/
export const LSEditTaskItem = (taskData:TaskTypes) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;
    
    //Получаем расположение задачи в массиве очереди
    const TASK_INDEX = TaskListData.orderData.indexOf(taskData.id);

    //Удаляем id задачи из массива очереди
    TaskListData.orderData.splice(TASK_INDEX, 1);
    //Вставляем id задачи в новое место
    TaskListData.orderData.splice(taskData.ordinalNumber, 0, taskData.id);
    //Перезаписываем объект с данными задачи на новый полученный объект
    taskDataObj[taskData.id] = {...taskData};
    //Прозводим перезапись порядкового номера во всех задачах
    taskDataObj = changeOrdinalNumbers(TaskListData);
    //Перезаписываем объект с данными в localStorage
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));
    
    //Возвращаем объект с данными саге
    return Promise.resolve(TaskListData);
} 

/** 
  * Изменение позиции задачи в localStorage
  * @param {Object} taskId - id задачи
  * @param {Object} position - Направление изменения позиции задачи
*/
export const LSChangeTaskPosition = (taskId:string, position: string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;

    const TASK_INDEX = TaskListData.orderData.indexOf(taskId), 
          //Направление изменение позиции
          cef = (position === 'down') ? 1 : -1;

    //Удаляем id задачи из массива очереди
    TaskListData.orderData.splice(TASK_INDEX, 1);
    //Вставляем id задачи в новое место
    TaskListData.orderData.splice(TASK_INDEX + cef, 0, taskId);
    //Прозводим перезапись порядкового номера во всех задачах
    taskDataObj = changeOrdinalNumbers(TaskListData);
    //Перезаписываем объект с данными в localStorage
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    //Возвращаем объект с данными саге
    return Promise.resolve(TaskListData);
} 

//Перезапись порядкового номера во всех задачах
function changeOrdinalNumbers(TaskListData:TaskListTypes) {
    let taskData: {
        [key: string]: TaskTypes
    } = TaskListData.taskData,
        orderData = TaskListData.orderData;

    //Получаем позицию id задачи в массиве очереди
    //и перезаписываем значение порядкового номера задачи в 
    //в списке данных задач
    Object.keys(taskData).forEach(key => {
        taskData[key].ordinalNumber = orderData.indexOf(key);
    });

    return TaskListData.taskData;
}

//Установка структуры данных в localStorage
function setTaskListDataInLS() {
    const TaskListData:TaskListTypes = {
        taskData: {

        },
        orderData: []
    }
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));
}

//Проверка на существование и корректность структуры данных в localSTorage
function checkCorrectDataStructure() {
    let TaskList = JSON.parse(localStorage.getItem('TaskListData'));
    const issetKeys = TaskList.taskData && TaskList.orderData;
    if (!issetKeys)
        return false;
    const taskDataType = typeof TaskList.taskData === 'object'
                         && Array.isArray(TaskList.orderData);

    return taskDataType;
}
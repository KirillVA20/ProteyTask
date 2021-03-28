import {TaskTypes, TaskListTypes} from '../../types';

export function LSgetTaskList() {
    if (!localStorage.getItem('TaskListData') || !checkCorrectDataStructure()) 
        setTaskListDataInLS();
    
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData'));

    return Promise.resolve(TaskListData);
}

export const LSremoveTaskItem = (taskId:string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;
        
    const TASK_INDEX = TaskListData.orderData.indexOf(taskId);

    delete taskDataObj[taskId];
    TaskListData.orderData.splice(TASK_INDEX, 1);
    taskDataObj = changeOrdinalNumbers(TaskListData);
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    return Promise.resolve(TaskListData);
} 

export const LSdoneTaskItem = (taskId:string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData[taskId];

    taskDataObj.done = !taskDataObj.done;
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    return Promise.resolve(TaskListData);
} 

export const LSaddTaskItem = (taskData:TaskTypes) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;

    TaskListData.orderData.splice(taskData.ordinalNumber, 0, taskData.id);
    taskDataObj[taskData.id] = {...taskData};
    taskDataObj = changeOrdinalNumbers(TaskListData);
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    return Promise.resolve(TaskListData);
} 

export const LSEditTaskItem = (taskData:TaskTypes) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;
    const TASK_INDEX = TaskListData.orderData.indexOf(taskData.id);

    TaskListData.orderData.splice(TASK_INDEX, 1);
    TaskListData.orderData.splice(taskData.ordinalNumber, 0, taskData.id);
    taskDataObj[taskData.id] = {...taskData};
    taskDataObj = changeOrdinalNumbers(TaskListData);
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));
    
    return Promise.resolve(TaskListData);
} 

export const LSChangeTaskPosition = (taskId:string, position: string) => {
    let TaskListData = JSON.parse(localStorage.getItem('TaskListData')),
        taskDataObj = TaskListData.taskData;

    const TASK_INDEX = TaskListData.orderData.indexOf(taskId), 
          cef = (position === 'down') ? 1 : -1;

    TaskListData.orderData.splice(TASK_INDEX, 1);
    TaskListData.orderData.splice(TASK_INDEX + cef, 0, taskId);
    taskDataObj = changeOrdinalNumbers(TaskListData);
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));

    return Promise.resolve(TaskListData);
} 

function changeOrdinalNumbers(TaskListData:TaskListTypes) {
    let taskData: {
        [key: string]: TaskTypes
    } = TaskListData.taskData,
        orderData = TaskListData.orderData;

    Object.keys(taskData).forEach(key => {
        taskData[key].ordinalNumber = orderData.indexOf(key);
    });

    return TaskListData.taskData;
}

function setTaskListDataInLS() {
    const TaskListData:TaskListTypes = {
        taskData: {

        },
        orderData: []
    }
    localStorage.setItem('TaskListData', JSON.stringify(TaskListData));
}

function checkCorrectDataStructure() {
    let TaskList = JSON.parse(localStorage.getItem('TaskListData'));
    const issetKeys = TaskList.taskData && TaskList.orderData;
    if (!issetKeys)
        return false;
    const taskDataType = typeof TaskList.taskData === 'object'
                         && Array.isArray(TaskList.orderData);

    return taskDataType;
}
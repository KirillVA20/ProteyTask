import React, {ReactNode, useEffect} from 'react';
import TaskItem from '../TaskItem/TaskItem';
import Tooltip from '../Tooltip/Tooltip';
import AddItemButton from '../AddItemButton/AddItemButton';
import {TaskListTypes, StoreTypes} from '../../types';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as itemsActions from '../../store/actions/actions';

interface ItemActionsTypes {
    deleteItemAction(id:string): void,
    getTaskListAction(): void,
    changeOpenModal(openModal:boolean,editTask:string): void,
    updateTaskDone(id:string): void,
    changeTaskPosition(id:string, position:string): void,
}

type TaskListProps = ItemActionsTypes & TaskListTypes;

/** 
  * Компонент-список, хранящий в себе компоненты-задачи
  * @param {Object} taskData - объект со всеми существующими задачами
  * @param {Array} orderData - массив, определяющий очередь вывода задач
*/
function TaskList({
    taskData,
    orderData,
    deleteItemAction,
    getTaskListAction,
    changeOpenModal,
    updateTaskDone,
    changeTaskPosition
}:TaskListProps) {

    /** 
     * Рендер всех существующих задач
    */
    const renderTaskItems = ():Array<ReactNode> => {
        let taskList:Array<ReactNode> = [];

        //Пробегаемся по массиву очереди, в которой добавляем задачу в массив
        orderData.forEach((id:string) => {
            taskList.push(
                <TaskItem key={id} 
                          {...taskData[id]}
                          deleteItem={deleteItemAction}
                          updateTaskDone={updateTaskDone}
                          changeTaskPosition={changeTaskPosition}
                          changeOpenModal={changeOpenModal}
                          taskListLenght={orderData.length - 1}
                />
            );
        });

        return taskList;
    }

    /** 
     * Начальное получение списка всех задач с localStorage
    */
    useEffect(() => {
        getTaskListAction();
    }, []);

    return (
        <section className="task-list">
            <div className="task-list__container">
                {renderTaskItems()}
                {/* Кнопка добавления новой задачи */}
                <Tooltip text="Создать задачу" position="bottom">
                   <AddItemButton changeOpenModal={changeOpenModal}/>
                </Tooltip>
            </div>
        </section>
    )
}

const mapStateToProps = (state:StoreTypes) => ({
    taskData: state.taskList.taskData,
    orderData: state.taskList.orderData
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(itemsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
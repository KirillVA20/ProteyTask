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

function TaskList(props:TaskListProps) {
    const renderTaskItems = ():Array<ReactNode> => {
        let taskList:Array<ReactNode> = [];

        props.orderData.forEach((id:string) => {
            taskList.push(
                <TaskItem key={id} 
                          {...props.taskData[id]}
                          deleteItem={props.deleteItemAction}
                          updateTaskDone={props.updateTaskDone}
                          changeTaskPosition={props.changeTaskPosition}
                          changeOpenModal={props.changeOpenModal}
                          taskListLenght={props.orderData.length - 1}
                />
            );
        });

        return taskList;
    }

    useEffect(() => {
        props.getTaskListAction();
    }, []);

    return (
        <section className="task-list">
            <div className="task-list__container">
                {renderTaskItems()}
                <Tooltip text="Создать задачу" position="bottom">
                   <AddItemButton changeOpenModal={props.changeOpenModal}/>
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
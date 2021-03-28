import React, {useRef} from 'react';
import {StoreTypes} from '../../types';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as itemsActions from '../../store/actions/actions';
import {TaskTypes, TaskListTypes} from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes
} from '@fortawesome/free-solid-svg-icons';


interface ModalActionsTypes {
    changeOpenModal(openModal:boolean, editTask:string): void,
    addTaskAction(taskData:TaskTypes): void,
    editTaskAction(taskData:TaskTypes): void,
}

interface ModalStoreTypes {
    editTask:string,
}

type ItemModalProps = TaskListTypes & ModalActionsTypes & ModalStoreTypes

function ItemModal(props:ItemModalProps) {
    const taskId = props.editTask, 
          taskData = (taskId) ? props.taskData[taskId] : null,
          taskNameRef = useRef(),
          taskDescriptionRef = useRef(),
          taskOrderRef = useRef(),
          taskDoneRef = useRef();
    
    const submitTaskForm = () => {
        const newTaskData = createNewTaskData();

        if (taskId)
            props.editTaskAction(newTaskData);
        else
            props.addTaskAction(newTaskData);

        props.changeOpenModal(false, '');
    }

    const createNewTaskData = ():TaskTypes => {
        const nameInput:HTMLInputElement = taskNameRef.current,
              descriptionInput:HTMLInputElement = taskDescriptionRef.current,
              orderInput:HTMLInputElement = taskOrderRef.current,
              doneInput:HTMLInputElement = taskDoneRef.current,
              generateTaskId:string = (taskId) 
                                        ? taskId 
                                        : Math.random().toString(36).substr(2, 9);

        const nameInputValue = (nameInput.value) 
                                ? nameInput.value 
                                : 'Безымянная задача',
              orderInputValue = (orderInput.value)
                                    ? Number.parseInt(orderInput.value) - 1
                                    : 0;

        return {
            id: generateTaskId,
            name: nameInputValue,
            description: descriptionInput.value,
            done: doneInput.checked,
            ordinalNumber: orderInputValue
        }
    }

    const checkMaxOrderInput = () => {
        const orderInput:HTMLInputElement = taskOrderRef.current,
              orderInputValue:number = Number.parseInt(orderInput.value),
              orderDataLenght = props.orderData.length;

        if (orderInputValue > orderDataLenght)
            orderInput.value = (orderDataLenght + 1).toString();
        
        if (orderInputValue < 1)
            orderInput.value = '1';
    }

    return (
        <div className="item-modal">
            <div className="item-modal__inner">
                <h2 className="item-modal__title">
                    Добавление задачи
                </h2>
                
                <div className="item-modal__input-container">

                    <div className="item-modal__input-wrap">
                        <label htmlFor="name" className="item-modal__label">
                            Название задачи
                        </label>
                        <input name="name" 
                               type="text" 
                               className="item-modal__input"
                               ref={taskNameRef}
                               defaultValue={(taskId) ? taskData.name : ''}
                        />
                    </div>

                    <div className="item-modal__input-wrap">
                        <label htmlFor="description" className="item-modal__label">
                            Описание задачи
                        </label>
                        <textarea name="description" 
                               className="item-modal__textarea"
                               ref={taskDescriptionRef}
                               defaultValue={(taskId) ? taskData.description : ''}
                        />
                    </div>

                    <div className="item-modal__input-wrap">
                        <label htmlFor="order" className="item-modal__label">
                            Порядковый номер задачи
                        </label>
                        <input name="order" 
                               type="number" 
                               className="item-modal__input"
                               ref={taskOrderRef}
                               defaultValue={(taskId) ? taskData.ordinalNumber + 1 : 1}
                               min={1}
                               max={props.orderData.length + 1}
                               onChange={checkMaxOrderInput}
                        />
                    </div>

                    <div className="item-modal__input-wrap">
                        <label htmlFor="done" className="item-modal__label">
                            Выполнено
                        </label>
                        <input name="done" 
                               type="checkbox"
                               ref={taskDoneRef} 
                               defaultChecked={(taskId) ? taskData.done : false}
                        />
                    </div>

                </div>
                <div className="item-modal__button-panel">
                    <button className="item-modal__add-button"
                            onClick={() => submitTaskForm()}
                    >
                        Добавить
                    </button>

                    <button className="item-modal__close-button"
                            onClick={() => props.changeOpenModal(false, '')}
                    >
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state:StoreTypes) => ({
    editTask: state.modal.editTask,
    taskData: state.taskList.taskData,
    orderData: state.taskList.orderData
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(itemsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);
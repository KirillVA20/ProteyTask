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

/** 
  * Модальное окно для создания/редактирования задачи
  * @param {string} editTask - id редактируемой задачи
  * @param {Object} taskData - объект со всеми задачами
  * @param {Array} orderData - массив с очередью задач
*/
function ItemModal({
    editTask,
    taskData,
    orderData,
    changeOpenModal,
    addTaskAction,
    editTaskAction
}:ItemModalProps) {
    const taskId = editTask, 
          taskDataObj = (taskId) ? taskData[taskId] : null,
          taskNameRef = useRef(),
          taskDescriptionRef = useRef(),
          taskOrderRef = useRef(),
          taskDoneRef = useRef();
    
    /**
     * Создание нового объекта данных для задачи 
     * и отправка на сохранение/редактирование в хранилище 
     * данных 
    */
    const submitTaskForm = () => {
        const newTaskData = createNewTaskData();

        //Если есть id задачи, значит, нужно вызвать функцию редактирования
        //В противном случае - функцию создания
        if (taskId)
            editTaskAction(newTaskData);
        else
            addTaskAction(newTaskData);

        changeOpenModal(false, '');
    }


    /**
     * Формирование нового объекта данных для задачи 
    */
    const createNewTaskData = ():TaskTypes => {
        const nameInput:HTMLInputElement = taskNameRef.current,
              descriptionInput:HTMLInputElement = taskDescriptionRef.current,
              orderInput:HTMLInputElement = taskOrderRef.current,
              doneInput:HTMLInputElement = taskDoneRef.current,
              generateTaskId:string = (taskId) 
                                        ? taskId 
                                        : Math.random().toString(36).substr(2, 9);

        //Если поле с именем осталось пустое - вставляем дефолтное имя
        const nameInputValue = (nameInput.value) 
                                ? nameInput.value 
                                : 'Безымянная задача',
        //Если поле с порядковым номером осталось пустое - вставляем дефолтное значение
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

    /**
     * Проверка поля с порядковым номером, чтобы не выводилось значения
     * выходящее из допустимого диапозона 
    */
    const checkMaxOrderInput = () => {
        const orderInput:HTMLInputElement = taskOrderRef.current,
              orderInputValue:number = Number.parseInt(orderInput.value),
              orderDataLenght = orderData.length;

        //Если введенное значение больше возможного, присваиваем дозволенный максимум
        if (orderInputValue > orderDataLenght)
            orderInput.value = (orderDataLenght + 1).toString();
        
        //Если значение меньше единицы, присваиваем еденицу
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

                    {/* Поле с названием задачи */}
                    <div className="item-modal__input-wrap">
                        <label htmlFor="name" className="item-modal__label">
                            Название задачи
                        </label>
                        <input name="name" 
                               type="text" 
                               className="item-modal__input"
                               ref={taskNameRef}
                               defaultValue={(taskId) ? taskDataObj.name : ''}
                        />
                    </div>

                    {/* Поле с описанием задачи */}
                    <div className="item-modal__input-wrap">
                        <label htmlFor="description" className="item-modal__label">
                            Описание задачи
                        </label>
                        <textarea name="description" 
                               className="item-modal__textarea"
                               ref={taskDescriptionRef}
                               defaultValue={(taskId) ? taskDataObj.description : ''}
                        />
                    </div>

                    {/* Поле с порядковым номером задачи */}
                    <div className="item-modal__input-wrap">
                        <label htmlFor="order" className="item-modal__label">
                            Порядковый номер задачи
                        </label>
                        <input name="order" 
                               type="number" 
                               className="item-modal__input"
                               ref={taskOrderRef}
                               defaultValue={(taskId) ? taskDataObj.ordinalNumber + 1 : 1}
                               min={1}
                               max={orderData.length + 1}
                               onChange={checkMaxOrderInput}
                        />
                    </div>

                    {/* Чекбокс с сотоянимем выполненности задачи */}
                    <div className="item-modal__input-wrap">
                        <label htmlFor="done" className="item-modal__label">
                            Выполнено
                        </label>
                        <input name="done" 
                               type="checkbox"
                               ref={taskDoneRef} 
                               defaultChecked={(taskId) ? taskDataObj.done : false}
                        />
                    </div>

                </div>
                <div className="item-modal__button-panel">
                    {/* Кнопка сохранения новых данных */}
                    <button className="item-modal__add-button"
                            onClick={() => submitTaskForm()}
                    >
                        Добавить
                    </button>

                     {/* Кнопка закрытия модального окна */}
                    <button className="item-modal__close-button"
                            onClick={() => changeOpenModal(false, '')}
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
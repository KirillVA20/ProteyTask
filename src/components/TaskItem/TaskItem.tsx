import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip/Tooltip';
import { 
    faEdit, 
    faChevronUp, 
    faChevronDown, 
    faTrashAlt,
    faCheck,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import {TaskTypes} from '../../types';

interface TaskActionsTypes {
    deleteItem(id:string): void,
    updateTaskDone(id:string): void,
    changeTaskPosition(id:string, position:string): void,
    changeOpenModal(openModal:boolean, editTask:string): void
}

interface TaskStateProps {
    taskListLenght:number
}

type TaskItemProps = TaskTypes & TaskActionsTypes & TaskStateProps;

/** 
  * Компонент-задача, в котором можно увидеть все данные о существущей задачи
  * и как-нибудь изменить его состояния и свойства
  * @param {number} taskListLenght - количество существующих задач
  * @param {number} ordinalNumber - порядковый номер задачи
  * @param {boolean} done - статус выполнения задачи
  * @param {string} name - Название задачи
  * @param {string} id - id задачи
  * @param {string} description - Описание задачи
*/
function TaskItem({
    taskListLenght,
    ordinalNumber,
    done,
    name,
    id,
    description,
    deleteItem,
    updateTaskDone,
    changeTaskPosition,
    changeOpenModal
}:TaskItemProps) {
    const tooltipPosition = (ordinalNumber) ? 'top' : 'bottom';
    return (
        <div className={`task-item ${done ? 'task-item--done' : ''}`}>
            <div className="task-item__inner">
                {/* Прядковый номер задачи */}
                <div className="task-item__number">
                    <Tooltip text="Порядковый номер" position="right">
                        {ordinalNumber + 1}
                    </Tooltip>
                </div>

                {/* Имя, id и описание задачи */}
                <div className="task-item__info">
                    <h2 className="task-item__name">
                        <Tooltip text="Название задачи" position={tooltipPosition}>
                            {name}
                        </Tooltip>
                        <Tooltip text="id задачи" position={tooltipPosition}>
                            <span className="task-item__id">
                                ({id})
                            </span>
                        </Tooltip>
                    </h2>
                    <span className="task-item__description" >
                        <Tooltip text="Описание задачи" position="top">
                            {description}
                        </Tooltip>
                    </span>
                </div>

                <div className="task-item__button-panel">
                    <div className="task-item__button-list">

                        {/* Кнопки, отвечающие за выполненость задачи */}
                        <div className="task-item__button-item"
                             onClick={() => updateTaskDone(id)}
                        >
                            {
                                (done) 
                                    ? <Tooltip text="Не выполнено" position={tooltipPosition}>
                                        <div ><FontAwesomeIcon icon={faTimes}/></div>
                                      </Tooltip>
                                    : <Tooltip text="Выполнено" position={tooltipPosition}>
                                        <div ><FontAwesomeIcon icon={faCheck}/></div>
                                      </Tooltip>
                            }
                        </div>

                        {/* Кнопка редактирования задачи*/}
                        <div className="task-item__button-item">
                            <Tooltip text="Редактировать" position={tooltipPosition}>
                                <button className="task-item__button task-item__button--edit"
                                        onClick={() => changeOpenModal(true, id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </Tooltip>
                        </div>
                        
                        {/* Кнопка, поднимающая задачу на 1 позицию вверх*/}
                        {
                            //Если задача одна в списке - не выводим кнопку
                            (ordinalNumber)
                                ?   <div className="task-item__button-item">
                                        <Tooltip text="Переместить вверх" position={tooltipPosition}>
                                            <button className="task-item__button task-item__button--top"
                                                    onClick={()=> changeTaskPosition(id, 'top')}
                                            >
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                : ''
                        }

                        {/* Кнопка, опускающая задачу на 1 позицию вниз*/}
                        {
                            //Если задача является последней в списке - не выводим кнопку
                            (ordinalNumber < taskListLenght)
                                ?  <div className="task-item__button-item">
                                        <Tooltip text="Переместить вниз" position={tooltipPosition}>
                                            <button className="task-item__button task-item__button--bottom"
                                                    onClick={()=> changeTaskPosition(id, 'down')}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                : ''
                        }

                        {/* Кнопка удаления задачи*/}
                        <div className="task-item__button-item">
                            <Tooltip text="Удалить" position={tooltipPosition}>
                                <button className="task-item__button task-item__button--delete"
                                        onClick={() => deleteItem(id)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;
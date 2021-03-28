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

function TaskItem(props:TaskItemProps) {
    const tooltipPosition = (props.ordinalNumber) ? 'top' : 'bottom';
    return (
        <div className={`task-item ${props.done ? 'task-item--done' : ''}`}>
            <div className="task-item__inner">
                <div className="task-item__number">
                    <Tooltip text="Порядковый номер" position="right">
                        {props.ordinalNumber + 1}
                    </Tooltip>
                </div>
                <div className="task-item__info">
                    <h2 className="task-item__name">
                        <Tooltip text="Название задачи" position={tooltipPosition}>
                            {props.name}
                        </Tooltip>
                        <Tooltip text="id задачи" position={tooltipPosition}>
                            <span className="task-item__id">
                                ({props.id})
                            </span>
                        </Tooltip>
                    </h2>
                    <span className="task-item__description" >
                        <Tooltip text="Описание задачи" position="top">
                            {props.description}
                        </Tooltip>
                    </span>
                </div>
                <div className="task-item__button-panel">
                    <div className="task-item__button-list">
                        
                        <div className="task-item__button-item"
                             onClick={() => props.updateTaskDone(props.id)}
                        >
                            {
                                (props.done) 
                                    ? <Tooltip text="Не выполнено" position={tooltipPosition}>
                                        <div ><FontAwesomeIcon icon={faTimes}/></div>
                                      </Tooltip>
                                    : <Tooltip text="Выполнено" position={tooltipPosition}>
                                        <div ><FontAwesomeIcon icon={faCheck}/></div>
                                      </Tooltip>
                            }
                        </div>

                        <div className="task-item__button-item">
                            <Tooltip text="Редактировать" position={tooltipPosition}>
                                <button className="task-item__button task-item__button--edit"
                                        onClick={() => props.changeOpenModal(true, props.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </Tooltip>
                        </div>
                        
                        {
                            (props.ordinalNumber)
                                ?   <div className="task-item__button-item">
                                        <Tooltip text="Переместить вверх" position={tooltipPosition}>
                                            <button className="task-item__button task-item__button--top"
                                                    onClick={()=> props.changeTaskPosition(props.id, 'top')}
                                            >
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                : ''
                        }

                        {
                            (props.ordinalNumber < props.taskListLenght)
                                ?  <div className="task-item__button-item">
                                        <Tooltip text="Переместить вниз" position={tooltipPosition}>
                                            <button className="task-item__button task-item__button--bottom"
                                                    onClick={()=> props.changeTaskPosition(props.id, 'down')}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                : ''
                        }

                        <div className="task-item__button-item">
                            <Tooltip text="Удалить" position={tooltipPosition}>
                                <button className="task-item__button task-item__button--delete"
                                        onClick={() => props.deleteItem(props.id)}
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
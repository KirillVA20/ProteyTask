import React from 'react';
import {connect} from 'react-redux';
import TaskList from  './TaskList/TaskList';
import ItemModal from './ItemModal/TaskModal';
import {StoreTypes} from '../types';

interface AppPropsTypes {
    openModal:boolean
}

/** 
  * Родительский компонент-контейнер, в котором находится весь контент
  * @param {boolean} openModal - свойство, отвечающая, за активность модального окна
*/
function App({openModal}:AppPropsTypes) {
    return (
        <div className="app">
            <TaskList />
            {(openModal) 
                ? <React.Fragment>
                    <ItemModal />
                    <div className="app__shadow"></div> 
                  </React.Fragment>
                : ''}
        </div>
    )
}

const mapStateToProps = (state:StoreTypes) => ({
    openModal: state.modal.openModal
})

export default connect(mapStateToProps)(App);
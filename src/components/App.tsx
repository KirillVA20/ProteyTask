import React from 'react';
import {connect} from 'react-redux';
import TaskList from  './TaskList/TaskList';
import ItemModal from './ItemModal/TaskModal';
import {StoreTypes} from '../types';

interface AppPropsTypes {
    openModal:boolean
}

function App(props:AppPropsTypes) {
    return (
        <div className="app">
            <TaskList />
            {(props.openModal) 
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
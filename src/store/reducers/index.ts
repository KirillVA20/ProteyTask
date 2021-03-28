import {combineReducers} from 'redux';
import taskList from './taskList';
import modal from './modal';

const reducers = combineReducers({taskList, modal});

export default reducers;
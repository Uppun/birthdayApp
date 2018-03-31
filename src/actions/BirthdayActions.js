import ActionTypes from './ActionTypes';
import Dispatcher from '../Dispatcher';

export default {
    add(name, month, day, timezone) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD,
            data: {name, month, day, timezone},
        })
    },

    remove(index) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE,
            index,
        })
    }
};
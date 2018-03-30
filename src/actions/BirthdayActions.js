import ActionTypes from './ActionTypes'
import Dispatcher from '../Dispatcher'

export default {
    add(name, date, timezone) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD,
            data: {name, date, timezone},
        })
    },

    remove(index) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE,
            index,
        })
    }
}
import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

class BirthdayStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }

    getInitialState() {
        const birthdays = [];
        return {birthdays};
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.ADD: {
                const birthdays = [...state.birthdays, action.data];
                return {birthdays};
            }
            case ActionTypes.REMOVE: {
                const birthdays = [...state.birthdays];
                birthdays.splice(action.index, 1);
                return {birthdays};
            }
            default: {
                return state;
            }
        }
    }
}

export default new BirthdayStore();
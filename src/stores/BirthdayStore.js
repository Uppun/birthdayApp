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
                const birthdayAdd = [...state.birthdays];
                const birthday = {...action.data};
                birthday.date = birthday.date.split('-').slice(1).join('/');
                birthdayAdd.push(birthday);
                return {birthdays: birthdayAdd};
            }
            case ActionTypes.REMOVE: {
                const birthdayRemove = [...state.birthdays];
                birthdayRemove.splice(action.index, 1);
                return {birthdays: birthdayRemove};
            }
            default: {
                return state;
            }
        }
    }
}

export default new BirthdayStore();
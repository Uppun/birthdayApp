import React from 'react';
import BirthdayStore from '../stores/BirthdayStore';
import BirthdayActions from '../actions/BirthdayActions';
import {Container} from 'flux/utils';
import '../css/main.css';

    function BirthdayListItem({self, name, date, time}) {
        const d = new Date();
        const personalOffset = parseInt(d.getTimezoneOffset(), 10);
        const birthdayOffset = parseInt(time, 10);
        const dateArray = date.split('/');
        const timeDiff = (personalOffset) - (birthdayOffset);
        const birthdayDate = new Date(d.getFullYear(), parseInt(dateArray[0]), parseInt(dateArray[1]));
        const birthdayTime = new Date((birthdayDate.getTime() - (timeDiff*60000)));
        let displayName;
        name.length >= 9 ? displayName = name.substring(0,9) + '...' : displayName = name;

        return (
            <div className="birthday-item">
                <div className="name_and_date">
                    <div className="name">
                        {`${displayName}\n`}
                        <span className='nameToolTip'>{name}</span>
                    </div>
                    <div className="date">
                        {`${birthdayTime.getMonth()}/${birthdayTime.getDate()}`}
                    </div>
                </div>
                <div className="remove_and_time">
                    <button className="btn-remove" type="button" onClick={() => BirthdayActions.remove(self)}>
                        &times;
                    </button>
                    <div className="time">
                        {`${birthdayTime.getHours()}:${birthdayTime.getMinutes()}`}
                    </div>
                </div>
            </div>
        );
}

class BirthdayList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            birthdays: [],
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getStores() {
        return [BirthdayStore];
    }
    
    static calculateState(prevState) {
        const birthdays = BirthdayStore.getState();

        return {...birthdays};
    }

    onSubmit(event) {
        event.preventDefault();

        if(!(this.name.value === '') && isNaN(this.date.value)) {
            BirthdayActions.add(this.name.value, this.date.value, this.timezone.value);
        }
    }

    render() {
        let {birthdays} = this.state;

        return(
        <div>
            <div className='birthday-list'>
                {birthdays.map((birthday, index) => (
                <BirthdayListItem key={index} self={index} name={birthday.name} date={birthday.date} time={birthday.timezone}/>
                ))}
            </div>
        <form onSubmit={this.onSubmit}>
            <div className='input'>
                <div>
                    Name: <input type='text' 
                                 className='nameBar'
                                 placeholder="Enter name"
                                 ref={node => {
                                     this.name = node;
                                 }}
                                 />
                    Date: <input type='date' 
                                 className='dateBar'
                                 ref={node => {
                                     this.date = node;
                                 }}
                                 />
                </div>
                Timezone: <select className='timezone'
                                  ref={node => {
                                      this.timezone = node
                                  }}
                                  >
                    <option value='0'>UTC</option>
                    <option value='-60'>CET (UTC+1)</option>
                    <option value='-120'>EET (UTC+2)</option>
                    <option value='-180'>FET (UTC+3)</option>
                    <option value='-240'>SAMT (UTC+4)</option>
                    <option value='-300'>YEKT (UTC+5)</option>
                    <option value='-360'>OMST (UTC+6)</option>
                    <option value='-420'>ICT (UTC+7)</option>
                    <option value='-480'>CST (UTC+8)</option>
                    <option value='-540'>JST (UTC+9)</option>
                    <option value='-600'>AEST (UTC+10)</option>
                    <option value='-660'>MAGT (UTC+11)</option>
                    <option value='-720'>PETT (UTC+12)</option>
                    <option value='-780'>UTC+13</option>
                    <option value='-840'>UTC+14</option>
                    <option value='60'>UTC-1</option>
                    <option value='120'>UTC-2</option>
                    <option value='180'>AST (UTC-3)</option>
                    <option value='240'>NST (UTC-4)</option>
                    <option value='300'>EST (UTC-5)</option>
                    <option value='360'>CST (UTC-6)</option>
                    <option value='420'>MST (UTC-7)</option>
                    <option value='480'>PST (UTC-8)</option>
                    <option value='540'>AKST (UTC-9)</option>
                    <option value='600'>HST (UTC-10)</option>
                    <option value='660'>STZ (UTC-11)</option>
                    <option value='720'>UTC-12</option>
                </select> 
            </div>
            <input type='submit' className='addBtn' value='Add'/>
        </form>
        </div>
        )
    }
}

export default Container.create(BirthdayList)
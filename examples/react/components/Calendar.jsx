import React, { Component } from 'react';
import { days } from 'calendar-months/lib/enums';
import Week from './Week';

class Calendar extends Component {

    render() {
        return (
            <div>
                <h1>{this.props.month.format('MMMM YYYY')}</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Mon</td>
                            <td>Tue</td>
                            <td>Wed</td>
                            <td>Thu</td>
                            <td>Fri</td>
                            <td>Sat</td>
                            <td>Sun</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.month.calendarWeeks(days.MONDAY).map((week, i) =>
                            <Week days={week} month={this.props.month} key={i} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;

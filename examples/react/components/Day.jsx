import React, { Component } from 'react';
import moment from 'moment';

class Day extends Component {

    isToday() {
        return moment().isSame(this.props.date, 'day');
    }

    isInCurrentMonth() {
        return this.props.month.containsDay(this.props.date);
    }

    get color() {
        if (!this.isInCurrentMonth()) {
            return 'gray';
        }

        if (this.isToday()) {
            return 'red';
        }

        return '';
    }

    render() {
        return (
            <td>
                <span style={{ color: this.color }}>
                    {this.props.date.format('DD')}
                </span>
            </td>
        );
    }
}

export default Day;

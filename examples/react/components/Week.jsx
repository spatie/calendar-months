import React, { Component } from 'react';
import Day from './Day';

class Week extends Component {

    render() {
        return (
            <tr>
                {this.props.days.map((day, i) =>
                    <Day date={day} month={this.props.month} key={i} />
                )}
            </tr>
        );
    }
}

export default Week;

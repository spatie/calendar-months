import Calendar from './components/Calendar';
import Month from 'calendar-months';
import React from 'react';
import { render } from 'react-dom';

render(
    <Calendar month={Month.now()} />,
    document.getElementById('calendar')
);

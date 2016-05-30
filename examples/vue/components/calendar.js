import { days } from 'calendar-months';
import Week from './week';

export default {

    props: ['month'],

    template: `
        <div>
            <h1>{{ month.format('MMMM YYYY') }}</h1>
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
                <tbody v-for="week in weeks">
                    <tr is="week" :days="week" :month="month"></tr>
                </tbody>
            </table>
        </div>
    `,

    components: {
        Week,
    },

    computed: {
        weeks() {
            return this.month.calendarWeeks(days.MONDAY);
        },
    },

};

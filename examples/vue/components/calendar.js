import { days } from 'calendar-months/lib/enums';
import Week from 'calendar-months/lib/weeks';

export default {

    props: ['month'],

    template: `
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

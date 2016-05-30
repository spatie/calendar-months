import moment from 'moment';

export default {

    props: ['days', 'month'],

    template: `
        <tr>
            <td v-for="day in days">
                <span
                    :class="{
                        'not-in-month': this.month.doesntContainDay(day),
                        'current': isToday(day),
                    }"
                >
                    {{ day.format('dd') }}
                </span>
            </td>
        </tr>
    `,

    methods: {
        isToday: day => moment().isSame(day, 'day'),
    },

};

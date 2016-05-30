import moment from 'moment';

export default {

    props: ['date', 'month'],

    template: `
        <span :style="{ color: color }">
            {{ date.format('DD') }}
        </span>
    `,

    computed: {
        color() {
            if (!this.isInCurrentMonth()) {
                return 'gray';
            }

            if (this.isToday()) {
                return 'red';
            }

            return '';
        },
    },

    methods: {
        isToday() {
            return moment().isSame(this.date, 'day');
        },
        isInCurrentMonth() {
            return this.month.containsDay(this.date);
        },
    },

};

import Calendar from './components/calendar';
import Month from 'calendar-months';
import Vue from 'vue';

new Vue({

    el: '#calendar',

    template: `
        <calendar :month="month"></calendar>
    `,

    components: {
        Calendar,
    },

    data() {
        return {
            month: Month.now(),
        };
    },

});

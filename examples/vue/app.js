import Calendar from './components/calendar';
import Month from 'calendar-months';
import Vue from 'vue';

new Vue({

    el: '#calendar',

    template: `
        <div>
            <calendar :month="month"></calendar>
        </div>
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

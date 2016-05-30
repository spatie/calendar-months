import Day from './day';

export default {

    props: ['days', 'month'],

    template: `
        <tr>
            <td v-for="day in days">
                <day :date="day" :month="month"></day>
            </td>
        </tr>
    `,

    components: {
        Day,
    },

};

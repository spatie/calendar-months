import { assert } from 'chai';
import { MONTHS } from '../src/enums';
import moment from 'moment';
import Month from '../src/Month';

describe('It returns returns a new instance for', () => {

    it('the current month through `thisMonth`', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-09' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-02' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2019-12' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.thisMonth().format(), result);
        });
    });

    it('the current month through `clone`', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-09' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-02' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2019-12' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.clone().format(), result);
        });
    });

    it('the next month', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-10' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-03' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2020-01' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.nextMonth().format(), result);
        });
    });

    it('the last month', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-08' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-01' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2019-11' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.lastMonth().format(), result);
        });
    });
});

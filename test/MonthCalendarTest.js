import { assert } from 'chai';
import { DAYS, MONTHS } from '../src/enums';
import moment from 'moment';
import Month from '../src/Month';

describe('It returns the first calendar day', () => {

    it('with weeks starting on a Sunday (default)', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12-28' ],
            [ Month.create(MONTHS.FEBRUARY, 2015), '2015-02-01' ],
            [ Month.create(MONTHS.JUNE, 2015), '2015-05-31' ],
            [ Month.create(MONTHS.FEBRUARY, 2016), '2016-01-31' ],
            [ Month.create(MONTHS.MARCH, 2016), '2016-02-28' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay().format('YYYY-MM-DD'), result);
            assert.equal(month.firstCalendarDay(DAYS.SUNDAY).format('YYYY-MM-DD'), result);
        });
    });

    it('with weeks starting on a a Monday', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12-29' ],
            [ Month.create(MONTHS.FEBRUARY, 2015), '2015-01-26' ],
            [ Month.create(MONTHS.JUNE, 2015), '2015-06-01' ],
            [ Month.create(MONTHS.FEBRUARY, 2016), '2016-02-01' ],
            [ Month.create(MONTHS.MARCH, 2016), '2016-02-29' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay(DAYS.MONDAY).format('YYYY-MM-DD'), result);
        });
    });

    it('with weeks starting on a a Wednesday', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12-31' ],
            [ Month.create(MONTHS.FEBRUARY, 2015), '2015-01-28' ],
            [ Month.create(MONTHS.JUNE, 2015), '2015-05-27' ],
            [ Month.create(MONTHS.FEBRUARY, 2016), '2016-01-27' ],
            [ Month.create(MONTHS.MARCH, 2016), '2016-02-24' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay(DAYS.WEDNESDAY).format('YYYY-MM-DD'), result);
        });
    });
});

describe('It generates an array for a calendar month', () => {

    it('with weeks starting on a Sunday (default)', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12-28', '2015-02-07' ],
            [ Month.create(MONTHS.FEBRUARY, 2015), '2015-02-01', '2015-03-14' ],
            [ Month.create(MONTHS.JUNE, 2015), '2015-05-31', '2015-07-11' ],
            [ Month.create(MONTHS.FEBRUARY, 2016), '2016-01-31', '2016-03-12' ],
            [ Month.create(MONTHS.MARCH, 2016), '2016-02-28', '2016-04-09' ],
        ];

        cases.forEach(([ month, start, end ]) => {
            const days = month.calendarDays(DAYS.SUNDAY);

            assert.lengthOf(days, 42);
            assert.equal(days[0].format('YYYY-MM-DD'), start);
            assert.equal(days[41].format('YYYY-MM-DD'), end);
        });
    });

    it('with weeks starting on a Monday', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12-29', '2015-02-08' ],
            [ Month.create(MONTHS.FEBRUARY, 2015), '2015-01-26', '2015-03-08' ],
            [ Month.create(MONTHS.JUNE, 2015), '2015-06-01', '2015-07-12' ],
            [ Month.create(MONTHS.FEBRUARY, 2016), '2016-02-01', '2016-03-13' ],
            [ Month.create(MONTHS.MARCH, 2016), '2016-02-29', '2016-04-10' ],
        ];

        cases.forEach(([ month, start, end ]) => {
            const days = month.calendarDays(DAYS.MONDAY);

            assert.lengthOf(days, 42);
            assert.equal(days[0].format('YYYY-MM-DD'), start);
            assert.equal(days[41].format('YYYY-MM-DD'), end);
        });
    });
});

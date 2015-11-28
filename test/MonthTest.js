import { assert } from 'chai';
import { DAYS, MONTHS } from '../src/enums';
import moment from 'moment';
import Month from '../src/Month';

describe('Creating an instance of Month', () => {

    it('returns a new instance through the `new` keyword', () => {

        const january = new Month(MONTHS.JANUARY, 2015);

        assert.equal(january.month, MONTHS.JANUARY);
        assert.equal(january.year, 2015);
    });

    it('returns a new instance through the `create` method', () => {

        const december = Month.create(MONTHS.DECEMBER, 2016);

        assert.equal(december.month, MONTHS.DECEMBER);
        assert.equal(december.year, 2016);
    });

    it('returns a new instance for this month', () => {

        const now = moment();
        const thisMonth = Month.thisMonth();

        assert.equal(thisMonth.month, now.month());
        assert.equal(thisMonth.year, now.year());
    });

    it('returns a new instance from a `moment` object', () => {

        const february = Month.create(moment('2015-02-17'));

        assert.equal(february.month, MONTHS.FEBRUARY);
        assert.equal(february.year, 2015);
    });

    it('returns a new instance from a `date` object', () => {

        const february = Month.create(moment('2015-02-17'));

        assert.equal(february.month, MONTHS.FEBRUARY);
        assert.equal(february.year, 2015);
    });

    it('returns a new instance from a date string', () => {

        const february = Month.create('2015-02-17');

        assert.equal(february.month, MONTHS.FEBRUARY);
        assert.equal(february.year, 2015);
    });
});

describe('Formatting a Month', () => {

    it('formats to YYYY-MM by default', () => {
        assert.equal(Month.create(MONTHS.JANUARY, 2015).format(), '2015-01');
    });

    it('can freely be formatted', () => {
        assert.equal(Month.create(MONTHS.JANUARY, 2015).format('MM-YYYY'), '01-2015');
    });
});

describe('Getting related Months', () => {

    it('returns the next month', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2015-02' ],
            [ Month.create(MONTHS.DECEMBER, 2015), '2016-01' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.nextMonth().format(), result);
        });
    });

    it('returns the last month', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2014-12' ],
            [ Month.create(MONTHS.DECEMBER, 2015), '2015-11' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.lastMonth().format(), result);
        });
    });

    it('returns the current month', () => {

        const cases = [
            [ Month.create(MONTHS.JANUARY, 2015), '2015-01' ],
            [ Month.create(MONTHS.DECEMBER, 2015), '2015-12' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.thisMonth().format(), result);
        });
    });
});

describe('Retrieving the first calendar day', () => {

    it('returns it\'s first calendar day, with weeks starting on a Sunday (default)', () => {

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

    it('returns it\'s first calendar day, with weeks starting on a a Monday', () => {

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

    it('returns it\'s first calendar day, with weeks starting on a a Wednesday', () => {

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

describe('Generating an array for a calendar month', () => {

    it('returns an array with all it\'s calendar days, with weeks starting on a Sunday', () => {

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

    it('returns an array with all it\'s calendar days, with weeks starting on a Monday', () => {

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

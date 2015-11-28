import { assert } from 'chai';
import { MONTHS } from '../src/enums';
import moment from 'moment';
import Month from '../src/Month';

import dd from 'dump-die';

describe('Creating an instance of Month', () => {

    it('can create return instance through the `new` keyword', () => {

        const january = new Month(MONTHS.JANUARY, 2015);

        assert.equal(january.month, MONTHS.JANUARY);
        assert.equal(january.year, 2015);
    });

    it('can return an instance through a `create` method', () => {

        const december = Month.create(MONTHS.DECEMBER, 2016);

        assert.equal(december.month, MONTHS.DECEMBER);
        assert.equal(december.year, 2016);
    });

    it('can return an instance for this month', () => {

        const now = moment();
        const thisMonth = Month.thisMonth();

        assert.equal(thisMonth.month, now.month());
        assert.equal(thisMonth.year, now.year());
    });

    it('can return an instance from a `moment` object', () => {

        const february = Month.create(moment('2015-02-17'));

        assert.equal(february.month, MONTHS.FEBRUARY);
        assert.equal(february.year, 2015);
    });

    it('can return an instance from a `date` object', () => {

        const february = Month.create(moment('2015-02-17'));

        assert.equal(february.month, MONTHS.FEBRUARY);
        assert.equal(february.year, 2015);
    });

    it('can return an instance from a date string', () => {

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
        assert.equal(Month.create(MONTHS.JANUARY, 2015).nextMonth().month, MONTHS.FEBRUARY);
        assert.equal(Month.create(MONTHS.JANUARY, 2015).nextMonth().year, 2015);

        assert.equal(Month.create(MONTHS.DECEMBER, 2015).nextMonth().month, MONTHS.JANUARY);
        assert.equal(Month.create(MONTHS.DECEMBER, 2015).nextMonth().year, 2016);
    });
});

describe('Getting days in the Month', () => {

    it('returns it\'s first calendar day', () => {
        assert.equal(
            Month.create(MONTHS.JANUARY, 2015).firstCalendarDay().format(),
            moment([2014, MONTHS.DECEMBER, 29]).format()
        );

        assert.equal(
            Month.create(MONTHS.FEBRUARY, 2015).firstCalendarDay().format(),
            moment([2015, MONTHS.JANUARY, 26]).format()
        );

        assert.equal(
            Month.create(MONTHS.JUNE, 2015).firstCalendarDay().format(),
            moment([2015, MONTHS.JUNE, 1]).format()
        );
    });

    it('returns an array with all it\'s calendar days', () => {
        const january = Month.create(MONTHS.JANUARY, 2015).calendarDays();

        assert.lengthOf(january, 42);

        assert.equal(
            january[0].format(),
            moment([2014, MONTHS.DECEMBER, 29]).format()
        );

        assert.equal(
            january[january.length-1].format(),
            moment([2015, MONTHS.FEBRUARY, 8]).format()
        );

        const february = Month.create(MONTHS.FEBRUARY, 2015).calendarDays();

        assert.lengthOf(february, 42);

        assert.equal(
            february[0].format(),
            moment([2015, MONTHS.JANUARY, 26]).format()
        );

        assert.equal(
            february[february.length-1].format(),
            moment([2015, MONTHS.MARCH, 8]).format()
        );

        const april = Month.create(MONTHS.APRIL, 2015).calendarDays();

        assert.lengthOf(april, 42);

        assert.equal(
            april[0].format(),
            moment([2015, MONTHS.MARCH, 30]).format()
        );

        assert.equal(
            april[april.length-1].format(),
            moment([2015, MONTHS.MAY, 10]).format()
        );
    });
});

describe('Validating days in the Month', () => {

});

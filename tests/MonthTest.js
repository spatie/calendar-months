import moment from 'moment';
import { assert } from 'chai';
import Month from '../src/Month';
import { MONTHS } from '../src/enums';

describe('Month', () => {

    it('is initializable', () => {
        let january = new Month(MONTHS.JANUARY, 2015);
        assert.equal(january.month, MONTHS.JANUARY);
        assert.equal(january.year, 2015);

        let december = Month.create(MONTHS.DECEMBER, 2016);
        assert.equal(december.month, MONTHS.DECEMBER);
        assert.equal(december.year, 2016);
    });

    it('has a name', () => {
        assert.equal(Month.create(MONTHS.JANUARY, 2015).name, '2015-01');
        assert.equal(Month.create(MONTHS.DECEMBER, 2016).name, '2016-12');
    });

    it('returns the next month', () => {
        assert.equal(Month.create(MONTHS.JANUARY, 2015).nextMonth.month, MONTHS.FEBRUARY);
        assert.equal(Month.create(MONTHS.JANUARY, 2015).nextMonth.year, 2015);

        assert.equal(Month.create(MONTHS.DECEMBER, 2015).nextMonth.month, MONTHS.JANUARY);
        assert.equal(Month.create(MONTHS.DECEMBER, 2015).nextMonth.year, 2016);
    });

    it('returns it\'s first calendar day', () => {
        assert.equal(
            Month.create(MONTHS.JANUARY, 2015).firstCalendarDay.format(),
            moment([2014, MONTHS.DECEMBER, 29]).format()
        );

        assert.equal(
            Month.create(MONTHS.FEBRUARY, 2015).firstCalendarDay.format(),
            moment([2015, MONTHS.JANUARY, 26]).format()
        );

        assert.equal(
            Month.create(MONTHS.JUNE, 2015).firstCalendarDay.format(),
            moment([2015, MONTHS.JUNE, 1]).format()
        );
    });

    it('returns an array with all it\'s calendar days', () => {
        let january = Month.create(MONTHS.JANUARY, 2015).calendarDays;

        assert.lengthOf(january, 42);

        assert.equal(
            january[0].format(),
            moment([2014, MONTHS.DECEMBER, 29]).format()
        );

        assert.equal(
            january[january.length-1].format(),
            moment([2015, MONTHS.FEBRUARY, 8]).format()
        );

        let february = Month.create(MONTHS.FEBRUARY, 2015).calendarDays;

        assert.lengthOf(february, 42);

        assert.equal(
            february[0].format(),
            moment([2015, MONTHS.JANUARY, 26]).format()
        );

        assert.equal(
            february[february.length-1].format(),
            moment([2015, MONTHS.MARCH, 8]).format()
        );

        let april = Month.create(MONTHS.APRIL, 2015).calendarDays;

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

import { assert } from 'chai';
import moment from 'moment';
import Month from '../src/Month';
import { months } from '../src/enums';

describe('It returns a new instance', () => {

    it('through the `new` keyword', () => {

        const cases = [
            [ months.SEPTEMBER, 2015 ],
            [ months.FEBRUARY, 1992 ],
            [ months.DECEMBER, 2019 ],
        ];

        cases.forEach(([ monthNumber, yearNumber ]) => {
            const month = new Month(monthNumber, yearNumber);

            assert.equal(month.month, monthNumber);
            assert.equal(month.year, yearNumber);
        });
    });

    it('by passing month and year numbers to the `create` method', () => {

        const cases = [
            [ months.SEPTEMBER, 2015 ],
            [ months.FEBRUARY, 1992 ],
            [ months.DECEMBER, 2019 ],
        ];

        cases.forEach(([ monthNumber, yearNumber ]) => {
            const month = Month.create(monthNumber, yearNumber);

            assert.equal(month.month, monthNumber);
            assert.equal(month.year, yearNumber);
        });
    });

    it('from a `moment` object', () => {

        const cases = [
            [ moment('2015-09-17'), months.SEPTEMBER, 2015 ],
            [ moment('1992-02-01'), months.FEBRUARY, 1992 ],
            [ moment('2019-12-25'), months.DECEMBER, 2019 ],
        ];

        cases.forEach(([ moment, monthNumber, yearNumber ]) => {
            const month = Month.create(moment);

            assert.equal(month.month, monthNumber);
            assert.equal(month.year, yearNumber);
        });
    });

    it('from a `date` object', () => {

        const cases = [
            [ new Date('2015-09-17'), months.SEPTEMBER, 2015 ],
            [ new Date('1992-02-01'), months.FEBRUARY, 1992 ],
            [ new Date('2019-12-25'), months.DECEMBER, 2019 ],
        ];

        cases.forEach(([ date, monthNumber, yearNumber ]) => {
            const month = Month.create(date);

            assert.equal(month.month, monthNumber);
            assert.equal(month.year, yearNumber);
        });
    });

    it('from a date string', () => {

        const cases = [
            [ '2015-09-17', months.SEPTEMBER, 2015 ],
            [ '1992-02-01', months.FEBRUARY, 1992 ],
            [ '2019-12-25', months.DECEMBER, 2019 ],
        ];

        cases.forEach(([ date, monthNumber, yearNumber ]) => {
            const month = Month.create(date);

            assert.equal(month.month, monthNumber);
            assert.equal(month.year, yearNumber);
        });
    });

    it('for the current month', () => {

        const now = new Date();
        const thisMonth = Month.thisMonth();

        assert.equal(thisMonth.month, now.getMonth());
        assert.equal(thisMonth.year, now.getFullYear());
    });
});

describe('It throws an error when', () => {

    it('an invalid month is provided', () => {

        assert.throw(() => new Month(13, 2015));
        assert.throw(() => new Month(12, 2015));
        assert.throw(() => new Month(-2, 2015));
        assert.throw(() => new Month(null, 2015));
    });

    it('an invalid year is provided', () => {

        assert.throw(() => new Month(1, null));
    });

    it('an non-supported argument is passed to `create`', () => {

        assert.throw(() => Month.create([1, 2015]));
        assert.throw(() => Month.create(() => [1, 2015]));
        assert.throw(() => Month.create('january 2015'));
    });
});

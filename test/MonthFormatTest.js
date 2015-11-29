import { assert } from 'chai';
import { MONTHS } from '../src/enums';
import moment from 'moment';
import Month from '../src/Month';

describe('It can be formatted to', () => {

    it('YYYY-MM by default', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-09' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-02' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2019-12' ],
        ];

        cases.forEach(([ month, formatted ]) => {
            assert.equal(month.format(), formatted);
        });
    });

    it('anything your heart desires', () => {

        const cases = [
            [ new Month(MONTHS.SEPTEMBER, 2015), '2015-09', '15-09', '2015-09-01', '01/09/2015' ],
            [ new Month(MONTHS.FEBRUARY, 1992), '1992-02', '92-02', '1992-02-01', '01/02/1992' ],
            [ new Month(MONTHS.DECEMBER, 2019), '2019-12', '19-12', '2019-12-01', '01/12/2019' ],
        ];

        cases.forEach(([ month, plain, shortYear, withDay, backwardsWithSlashes ]) => {
            assert.equal(month.format('YYYY-MM'), plain);
            assert.equal(month.format('YY-MM'), shortYear);
            assert.equal(month.format('YYYY-MM-DD'), withDay);
            assert.equal(month.format('DD/MM/YYYY'), backwardsWithSlashes);
        });
    });
});

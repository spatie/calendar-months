# calendar-months

[![Latest Version on NPM](https://img.shields.io/npm/v/calendar-months.svg?style=flat-square)](https://npmjs.com/package/calendar-months)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/calendar-months/master.svg?style=flat-square)](https://travis-ci.org/spatie/calendar-months)
[![Code Climate](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg?style=flat-square)](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg)

Provides a `Month` class with specialized functions for generating calendar user interfaces.

Calendar UI's generally start each month on the same day of the week, and keep months at the same visual height every month. If a month starts on a Wednesday, you'll probably want to hide or gray out the Monday and Tuesday before. This package provides an unopinionated class to help you build these interfaces.

A calendar month always has exactly 42 days, or 6 weeks.

```
|------------------------------------------------------|
|                   December 2015                      |
| -#- |  M   |  T   |  W   |  T   |  F   |  S   |  S   |
|------------------------------------------------------|
| -1- |  30* |  1   |  2   |  3   |  4   |  5   |  6   |
| -2- |  7   |  8   |  9   |  10  |  11  |  12  |  13  |
| -3- |  14  |  15  |  16  |  17  |  18  |  19  |  20  |
| -4- |  21  |  22  |  23  |  24  |  25  |  26  |  27  |
| -5- |  28  |  29  |  30  |  31  |  1*  |  2*  |  3*  |
| -6- |  4*  |  5*  |  6*  |  7*  |  8*  |  9*  |  10* |
|------------------------------------------------------|

*: Gray out or hide
```

```es6
import Month from 'calendar-months';

const january = new Month('2015-01');

const days = january.calendarDays();
// => An array of all days that could be visible on the calendar (always 42 days)

const weeks = january.calendarWeeks();
// => An array of 6 arrays, each containing 7 days
```

The `examples` folder in this repository contains examples of React and Vue implementations.

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Install

You can install the package via npm:

```bash
$ npm install calendar-months
```

## Usage

### Creating Month Instances

#### From Integers

```es6
import Month from 'calendar-months';

new Month(0, 2016);
// => January 2016
```

Since javascript uses a 0-based index for months, the package also ships with a set of enums to improve clarity when dealing with month numbers.

```es6
import Month from 'calendar-months';
import { months } from 'calendar-months/lib/enums';

new Month(months.JANUARY, 2016);
// => January 2016
```

The `Month.create` method also accepts integers to create a `Month` object.

```es6
import Month from 'calendar-months';

Month.create(0, 2016);
// => January 2016
```

#### From Strings

The `Month.create` method accepts a string in the format of `YYYY-MM[-...]`.

```es6
import Month from 'calendar-months';

Month.create('2016-01');
// => January 2016

Month.create('2016-02-04');
// => February 2016
```

#### From a Moment or Date object

The `Month.create` method accepts `Moment` and Date objects.

```es6
import moment from 'moment';
import Month from 'calendar-months';

Month.create(moment());
// => This month

Month.create(new Date());
// => This month
```

#### In a Relative Point in Time

There are a few factory methods to create `Month` instances for this month, the previous month and the next month.

```es6
import Month from 'calendar-months';

Month.create();
Month.now();
Month.thisMonth();
// => This month

Month.lastMonth();
Month.previousMonth();
// => The previous month

Month.nextMonth();
// => The next month
```

`thisMonth`, `lastMonth`, `previousMonth` and `nextMonth` can also be used on existing `Month` instances. These methods are immutable, and return a new instance of the object.

```es6
import Month from 'calendar-months';

const june = Month.create('2016-06');

const may = june.lastMonth();
const july = june.nextMonth();
```

### Retrieving Days and Weeks

`calendarDays`
`calendarWeeks`

### Additional Methods

#### Comparing Months

`isThisMonth`
`isNextMonth`

#### Comparing Months with Days

`containsDay`
`doesntContainDay`

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email freek@spatie.be instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

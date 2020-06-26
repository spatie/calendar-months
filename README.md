# calendar-months

[![Latest Version on NPM](https://img.shields.io/npm/v/calendar-months.svg?style=flat-square)](https://npmjs.com/package/calendar-months)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/calendar-months/master.svg?style=flat-square)](https://travis-ci.org/spatie/calendar-months)
[![Code Climate](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg?style=flat-square)](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg)

Provides a `Month` class with specialized functions for generating calendar user interfaces.

Calendar UI's generally start each month on the same day of the week, and keep months at the same visual height every month. If a month starts on a Wednesday, you'll probably want to hide or gray out the Monday and Tuesday before. This package provides an unopinionated class to help you build these interfaces.

A calendar month always has exactly 42 days, or 6 weeks.

```
|------------------------------------------------|
|                December 2015                   |
|  M   |  T   |  W   |  T   |  F   |  S   |  S   |
|------------------------------------------------|
|  30* |  1   |  2   |  3   |  4   |  5   |  6   |
|  7   |  8   |  9   |  10  |  11  |  12  |  13  |
|  14  |  15  |  16  |  17  |  18  |  19  |  20  |
|  21  |  22  |  23  |  24  |  25  |  26  |  27  |
|  28  |  29  |  30  |  31  |  1*  |  2*  |  3*  |
|  4*  |  5*  |  6*  |  7*  |  8*  |  9*  |  10* |
|------------------------------------------------|

*: Gray out or hide
```

```js
import Month from 'calendar-months';

const january = new Month('2015-01');

const days = january.calendarDays();
// => An array of all days that could be visible on the calendar (always 42 days)

const weeks = january.calendarWeeks();
// => An array of 6 arrays, each containing 7 days
```

The `examples` folder in this repository contains examples of React and Vue implementations.

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment you are required to send us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Kruikstraat 22, 2018 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

You can install the package via npm:

```bash
$ npm install calendar-months
```

## Examples

The `examples` directory in this repository contains Vue and a React example calendars.

To open an example, navigate to it's directory to run `npm install` and `npm run build`, then open the `index.html` file in your browser.

## Usage

### Creating Month Instances

#### From Integers

```js
import Month from 'calendar-months';

new Month(0, 2016);
// => January 2016
```

Since javascript uses a 0-based index for months, the package also ships with a set of enums to improve clarity when dealing with month numbers.

```js
import Month, { months } from 'calendar-months';

new Month(months.JANUARY, 2016);
// => January 2016
```

The `Month.create` method also accepts integers to create a `Month` object.

```js
import Month from 'calendar-months';

Month.create(0, 2016);
// => January 2016
```

#### From Strings

The `Month.create` method accepts a string in the format of `YYYY-MM[-...]`.

```js
import Month from 'calendar-months';

Month.create('2016-01');
// => January 2016

Month.create('2016-02-04');
// => February 2016
```

#### From a Moment or Date object

The `Month.create` method accepts `Moment` and Date objects.

```js
import moment from 'moment';
import Month from 'calendar-months';

Month.create(moment());
// => This month

Month.create(new Date());
// => This month
```

#### In a Relative Point in Time

There are a few factory methods to create `Month` instances for this month, the previous month and the next month.

```js
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

```js
import Month from 'calendar-months';

const june = Month.create('2016-06');

const may = june.lastMonth();
const july = june.nextMonth();
```

### Retrieving Days and Weeks

To retrieve all the weeks in a calendar month, there's a `calendarWeeks` method. `calendarWeeks` returns an array of 6 arrays, each containing 7 days. A day is a moment object with the time set to `00:00:00`.

```js
import Month from 'calendar-months';

const weeksInJune = Month.create('2016-06').calendarWeeks();

// => [ [ sun, mon, tue, wed, thu, fri, sat ], ... ]
```

If you want your calendars weeks to start on a different day, you can pass in a day as the first parameter. By default, a week starts on Sunday. Since javascript uses a 0-based index for days, the package also ships with a set of enums to improve clarity when dealing with day numbers.

```js
import Month, { days } from 'calendar-months';

const weeksInJune = Month.create('2016-06').calendarWeeks(days.MONDAY);

// => [ [ mon, tue, wed, thu, fri, sat, sun ], ... ]
```

If you want to retrieve all days without chunking them by week, there's a `calendarDays` method. This method also optionally accepts a starting day as it's first parameter.

```js
import Month, { days } from 'calendar-months';

const daysInJune = Month.create('2016-06').calendarDays(days.MONDAY);

// => [ mon, tue, wed, thu, fri, sat, sun, mon, tue, wed, ... ]
```

### Additional Methods

#### Checking Months

There are three methods to check the position of a month compared to the current time:

- `isThisMonth`
- `isFuture`
- `isPast`

```js
// Considering it's currently June 2016...

import Month from 'calendar-months';

const june = Month.create('2016-06');

june.isThisMonth(); // => true
june.isPast(); // => false
june.isFuture(); // => false

const may = Month.create('2016-05');

may.isPast(); // => true

const july = Month.create('2016-07');

july.isFuture(); // => true
```

#### Checking Days in a Month

By providing a `moment` object of a date, you can check if that date is part of the `Month` instance with `containsDay` and `doesntContainDay`.

```js
import Month from 'calendar-months';

const june = Month.create('2016-06');

june.containsDay(moment('2016-06-23')); // => true
june.containsDay(moment('2016-04-03')); // => false

june.doesntContainDay(moment('2016-06-23')); // => false
june.doesntContainDay(moment('2016-04-03')); // => true
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

This package is fully tested with `mocha` and `chai`. To run the tests, use the npm script:

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

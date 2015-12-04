# calendar-months

[![Latest Version on NPM](https://img.shields.io/npm/v/calendar-months.svg?style=flat-square)](https://npmjs.com/package/calendar-months)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/calendar-months/master.svg?style=flat-square)](https://travis-ci.org/spatie/calendar-months)
[![Code Climate](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg?style=flat-square)](https://img.shields.io/codeclimate/github/spatie/calendar-months.svg)

Provides a `Month` class with specialized functions for generating calendar user interfaces.

Calendar UI's generally start each month on the same day of the week, and keep months at the same visual height every month. If a month starts on a Wednesday, you'll probably want to hide or gray out the Monday and Tuesday before. This package provides an unopinionated class to help you build these interfaces.

A calendar month always has exactly 42 days, or 6 weeks.

```
|-----------------------------------------------------|
|                   December 2015                     |
| #  |  M   |  T   |  W   |  T   |  F   |  S   |  S   |
|-----------------------------------------------------|
| 1  |  30* |  1   |  2   |  3   |  4   |  5   |  6   |
| 2  |  7   |  8   |  9   |  10  |  11  |  12  |  13  |
| 3  |  14  |  15  |  16  |  17  |  18  |  19  |  20  |
| 4  |  21  |  22  |  23  |  24  |  25  |  26  |  27  |
| 5  |  28  |  29  |  30  |  31  |  1*  |  2*  |  3*  |
| 6  |  4*  |  5*  |  6*  |  7*  |  8*  |  9*  |  10* |
|-----------------------------------------------------|

*: Gray out or hide
```

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Install

You can install the package via npm:

```bash
$ npm install calendar-months
```

## Usage

```es6
import Month from 'calendar-months';

const january = new Month('2015-01');
```

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

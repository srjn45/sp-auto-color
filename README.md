# sp-auto-color

auto-color is a wrapper component that manages the text color on the basis of background color.

selects white font color for dark backgrounds and black for light on the basis of threshold.

default threshold value is 128

it supports hex, rgb & rgba coloring formats

## Installation & Usage

install the package

```
$ npm i --save sp-auto-color

```



```
import AutoColor from 'sp-auto-color';

...


render () {
    return (
        ...

            <AutoColor threshold={128} backgroundColor={'rgb(223, 252, 178)'}>
                ...your code here
            </AutoColor>

        ...
    )
}
```
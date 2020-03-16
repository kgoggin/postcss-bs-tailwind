# postcss-bs-tailwind

A PostCSS plugin for generating ReasonML variables that correspond to [Tailwind CSS](https://tailwindcss.com/) classnames.

## What does this plugin do?

This plugin generates a `Tailwind.re` module for you that contains a binding for each and every Tailwind class in your CSS. So, instead of relying on strings in your code (which can be prone to typos), you get the safety (and the auto-complete) of a variable! And, thanks to BuckleScript's `[@bs.inline]` directive, the bindings have _zero runtime cost!_ They complile to plain strings!

## Installation and Configuration

This codegen tool works best when you're using [re-classnames](https://github.com/MinimaHQ/re-classnames), which is a ReasonML implementation of the popular [classnames](https://github.com/JedWatson/classnames) library for composing classes into a string you can pass to the `className` prop on a DOM node. The examples bellow assume you've followed re-classname's installation instructions.

```bash
npm install postcss-bs-tailwind re-classnames

# or

yarn add postcss-bs-tailwind re-classnames
```

Then, update your PostCSS config to look something like this:

```js
const tailwindcss = require("tailwindcss");
const reason = require("postcss-bs-tailwind");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    reason({ modulePath: "./bindings/Tailwind.re" })
  ]
};
```

**Important:** Make sure this plugin appears after your `tailwindcss` plugin, preferably last in the list.

The `modulePath` config value is required, and denotes the name/location where you'd like the generated module. Now, when you run PostCSS, you'll end up with a Reason module that looks like this:

```reason
// ...
[@bs.inline] let bg_cyan_050 = "bg-cyan-050";
[@bs.inline] let bg_cyan_100 = "bg-cyan-100";
[@bs.inline] let bg_cyan_200 = "bg-cyan-200";
[@bs.inline] let bg_cyan_300 = "bg-cyan-300";
// ...
```

So now, in your ReasonReact code, you can do:

```reason
open Tailwind;

[@react.component]
let make = () => {
  <button className=Cn.make([bg_cyan_300])> "Cyan Button"->React.string </button>
};
```

## Name Mapping

Tailwind's default naming scheme isn't compatible with Reason's syntax, so each name gets changed a little:

| Tailwind Class    | Reason Variable      | Naming Rule                                                                                    |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| bg-blue-100       | bg_blue_100          | `-` gets changed to `_`                                                                        |
| focus:bg-blue-100 | focus\_\_bg_blue_050 | `:` gets changed to `__`                                                                       |
| -m-1              | neg_m_1              | `-` as a prefix gets changed to `neg_`                                                         |
| w-1/2             | w_one_half           | `1/2` gets changed to `one_half` (other fractions get replaced with their text representation) |

Don't worry - the Reason varaible is only a placeholder for the actual string value! When your Reason code is compliled to JS, the original Tailwind string will be right where you expect it!

## Custom Tailwind Stuff

No worries! This plugin works by parsing the CSS _after_ Tailwind CSS is generated. It walks through each class definition in your CSS code and transforms the class' name into something that's Reason-friendly. So, any special classes you've got (from Tailwind plugins or custom config) should get picked up just fine. That said, there could be some naming edge cases that aren't handled as of yet. Feel free to open an issue if you bump into one!

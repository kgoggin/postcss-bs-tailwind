const postcss = require("postcss");
const fs = require("fs");
const path = require("path");
const { camelCase, uniq } = require("lodash");
const transformClassName = require("./src/transformClassName");
const makeReasonableClassName = require("./src/makeReasonableClassName");

const writeClass = (c) => {
  return `[@bs.inline] let ${makeReasonableClassName(c)} = "${c}";`;
};

const make = (classes) => {
  const twNames = uniq(classes.map(transformClassName));
  return twNames.map(writeClass).join("\n");
};

module.exports = postcss.plugin("postcss-bs-tailwind", (opts = {}) => {
  const { modulePath } = opts;
  return (root, result) => {
    const classes = [];
    root.walkRules((rule) => {
      if (!rule.selector.startsWith(".")) {
        // keep only classes
        return;
      }

      let cn = rule.selector;

      const arr = rule.selector.split(" ");
      if (arr.length > 1) {
        arr.filter(s => s.startsWith(".")).forEach(cn => classes.push(cn));
      } else {
        classes.push(cn);
      }
    });

    fs.writeFileSync(path.join(process.cwd(), modulePath), make(classes), {
      encoding: "utf8",
    });
  };
});

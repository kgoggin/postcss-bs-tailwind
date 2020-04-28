const postcss = require("postcss");
const fs = require("fs");
const path = require("path");
const { camelCase, uniq } = require("lodash");
const transformClassName = require("./src/transformClassName");
const makeReasonableClassName = require("./src/makeReasonableClassName");
const filterClassNamesForProcessing = require("./src/filterClassNamesForProcessing");

const writeClass = (c) => {
  return `[@bs.inline] let ${makeReasonableClassName(c)} = "${c}";`;
};

const make = (classes) => {
  const twNames = classes.map(transformClassName);
  return twNames.map(writeClass).join("\n");
};

module.exports = postcss.plugin("postcss-bs-tailwind", (opts = {}) => {
  const { modulePath } = opts;
  return (root, result) => {
    let classes = [];
    root.walkRules((rule) => {
      classes = classes.concat(filterClassNamesForProcessing(rule.selector));
    });
    classes = uniq(classes);

    fs.writeFileSync(path.join(process.cwd(), modulePath), make(classes), {
      encoding: "utf8",
    });
  };
});

const makeReasonableClassName = cn => {
  let result = cn;
  // handle negative at start of string
  result = result.replace(/^-([p|m])/, "neg_$1");
  // handle negative with variant
  result = result.replace(/:-([p|m])/, "__neg_$1");

  return result.replace(/-/g, "_").replace(/:/g, "__");
};

module.exports = makeReasonableClassName;

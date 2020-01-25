const makeReasonableClassName = cn => {
  let result = cn;
  // handle negative at start of string
  result = result.replace(/^-([p|m])/, "neg_$1");
  // handle negative with variant
  result = result.replace(/:-([p|m])/, "__neg_$1");

  result = result.replace("1/2", "one_half");
  result = result.replace("1/3", "one_third");
  result = result.replace("2/3", "two_thirds");
  result = result.replace("1/4", "one_fourth");
  result = result.replace("2/4", "two_fourths");
  result = result.replace("3/4", "three_fourths");
  result = result.replace("1/5", "one_fifth");
  result = result.replace("2/5", "two_fifths");
  result = result.replace("3/5", "three_fifths");
  result = result.replace("4/5", "four_fifths");
  result = result.replace("1/6", "one_sixth");
  result = result.replace("2/6", "two_sixths");
  result = result.replace("3/6", "three_sixths");
  result = result.replace("4/6", "four_sixths");
  result = result.replace("5/6", "five_sixths");
  result = result.replace("1/12", "one_twelfth");
  result = result.replace("2/12", "two_twelfths");
  result = result.replace("3/12", "three_twelfths");
  result = result.replace("4/12", "four_twelfths");
  result = result.replace("5/12", "five_twelfths");
  result = result.replace("6/12", "six_twelfths");
  result = result.replace("7/12", "seven_twelfths");
  result = result.replace("8/12", "eight_twelfths");
  result = result.replace("9/12", "nine_twelfths");
  result = result.replace("10/12", "ten_twelfths");
  result = result.replace("11/12", "eleven_twelfths");

  return result.replace(/-/g, "_").replace(/:/g, "__");
};

module.exports = makeReasonableClassName;

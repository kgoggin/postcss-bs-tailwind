const makeReasonableClassName = require("../makeReasonableClassName");

describe("makeReasonableClassName", () => {
  test.each`
    classname                     | expected
    ${"container"}                | ${"container"}
    ${"bg-gray-100"}              | ${"bg_gray_100"}
    ${"-m-1"}                     | ${"neg_m_1"}
    ${"sm:-m-1"}                  | ${"sm__neg_m_1"}
    ${"placeholder-pink-800"}     | ${"placeholder_pink_800"}
    ${"placeholder-pink-800"}     | ${"placeholder_pink_800"}
    ${"sm:bg-red-400"}            | ${"sm__bg_red_400"}
    ${"lg:hover:text-purple-600"} | ${"lg__hover__text_purple_600"}
  `(
    "returns $expected when className is $classname",
    ({ classname, expected }) => {
      expect(makeReasonableClassName(classname)).toBe(expected);
    }
  );
});

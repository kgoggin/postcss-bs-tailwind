const transformClassName = require("../transformClassName");

describe("transformClassName", () => {
  test.each`
    classname                                             | expected
    ${".container"}                                       | ${"container"}
    ${".bg-gray-100"}                                     | ${"bg-gray-100"}
    ${".-m-1"}                                            | ${"-m-1"}
    ${".placeholder-pink-800::-webkit-input-placeholder"} | ${"placeholder-pink-800"}
    ${".placeholder-pink-800:-ms-input-placeholder"}      | ${"placeholder-pink-800"}
    ${".sm:bg-red-400"}                                   | ${"sm:bg-red-400"}
    ${`.focus\:bg-orange-100:focus`}                      | ${`focus:bg-orange-100`}
    ${".lg:hover:text-purple-600:hover"}                  | ${"lg:hover:text-purple-600"}
    ${".last\:rounded-b:last-child"}                      | ${"last:rounded-b"}
    ${".first\:rounded-t:first-child"}                    | ${"first:rounded-t"}
    ${".odd\:text-purple-600:nth-child(odd)"}             | ${"odd:text-purple-600"}
    ${".even\:text-purple-600:nth-child(even)"}           | ${"even:text-purple-600"}
  `(
    "returns $expected when className is $classname",
    ({ classname, expected }) => {
      expect(transformClassName(classname)).toBe(expected);
    }
  );
});

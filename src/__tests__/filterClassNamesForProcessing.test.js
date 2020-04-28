const filterClassNamesForProcessing = require("../filterClassNamesForProcessing");

describe("filterClassNamesForProcessing", () => {
    test.each`
        selector                                                | expected
        ${"h1 h2"}                                              | ${[]}
        ${".space-x-0"}                                         | ${[".space-x-0"]}
        ${".group:hover .group-hover\\:rounded"}                | ${[".group:hover", ".group-hover\\:rounded"]}
        ${".class1.class2 .class3"}                             | ${[".class1", ".class2", ".class3"]}
        ${".space-y-0 > :not(template) ~ :not(template)"}       | ${[".space-y-0"]}
    `(
        "return $expected when selector is $selector",
        ({selector, expected}) => {
            expect(filterClassNamesForProcessing(selector)).toEqual(expected);
        }
    );
});

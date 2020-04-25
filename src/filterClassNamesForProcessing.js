const { chain } = require("lodash");

const filterClassNamesForProcessing = (selector) => {
        if (!selector.startsWith(".")
            || selector.trim().length === 0) {
          // keep only classes
          return [];
        }

        const arr = selector.split(" ");
        if (arr.length === 1) { // Avoid heavy processing in single classes 
            return arr;
        }
        if (arr.length > 1) {
            return chain(arr)
                .filter(sel => sel.includes(".")) // Check for selectors that are classes
                .flatMap(cns => cns.split(".") // Split possibly chained classes like '.a.b.c'
                        .filter(cn => cn.length > 0) // Call to split(".") might've added empty strings, remove them
                        .map(cn => `.${cn}`)) // Add dot lost in cns.split(".") to every class
                .value(); 
        } else {
          return arr;
        }
      };

module.exports = filterClassNamesForProcessing;

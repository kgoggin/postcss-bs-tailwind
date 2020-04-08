const stripBrowserPrefixes = (cn) => {
  let idx = cn.indexOf("::");
  if (idx === -1) {
    idx = cn.indexOf(":-ms-");
  }

  return idx === -1 ? cn : cn.substring(0, idx);
};

const transformClassname = (cn) => {
  // strip out the leading `.`
  let cls = cn.replace(/^(\.)/, "");
  cls = cls.replace(/^(\.)/, "");

  // handle psuedo classes
  cls = cls.replace(
    /\:(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled|group:hover|group:focus)$/,
    ""
  );
  // remove extras at end
  cls = stripBrowserPrefixes(cls);
  //
  cls = cls.replace(/\\\//g, "/");
  // // make \/ safe for elm
  cls = cls.replace(/\\([/])/g, "\\\\$1");
  // // make \: safe for elm
  cls = cls.replace(/\\([:])/g, "$1");
  // cls = cls.replace(
  //   /^(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled)\\\\:/,
  //   "$1:"
  // );

  return cls;
};

module.exports = transformClassname;

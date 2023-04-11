import codegen from "babel-plugin-codegen/macro";

const fn = codegen`
const { IconsManifest } = require("react-icons-as/lib/cjs");

let codes = "(function (id) { switch (id) {";
IconsManifest.forEach(icon => {
  codes += 'case "' + icon.id + '":\\nreturn import("react-icons-as/' + icon.id +'/index");\\n'
})
codes += '}})';

module.exports = codes;
// module.exports = "import('react-icons-as/fa/index')"
`;

export function getIcons(iconsId) {
  /*
  Dynamic Import with improved performance.
  Macros are used to avoid bundling unnecessary modules.

  Similar to this code
  ```
  return import(`react-icons/${iconsId}/index`);
  ```
  */

  return fn(iconsId);
}

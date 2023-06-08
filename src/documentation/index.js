const authPath = require("./api-auth");
const apiInfo = require("./api-info");
const apiTags = require("./api-tags");
const components = require("./components");

module.exports = {
  ...apiInfo,
  ...apiTags,
  ...authPath,
  ...components,
};

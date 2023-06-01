const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../documentation");

const router = express.Router();

const { BASE_URL } = process.env;

const options = {
  explorer: true,
  swaggerOptions: {
    url: `${BASE_URL}/api/api-docs/swagger.json`,
  },
};

router.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));

router.use("/api-docs", swaggerUi.serveFiles(null, options));
router.get("/api-docs", swaggerUi.setup(null, options));

module.exports = router;

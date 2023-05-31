// cS3H1p9arI22OLxX

const mongoose = require("mongoose")
const app = require("./app")

const DB_HOST =
  "mongodb+srv://Roman:cS3H1p9arI22OLxX@cluster0.uyviycd.mongodb.net/so_yummy?retryWrites=true&w=majority"

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001)
    console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })

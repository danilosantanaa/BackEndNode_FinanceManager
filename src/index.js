const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

require("./routes/index")(app)

app.listen(3001, () => {
    console.log("Server Running in port 3001");
});
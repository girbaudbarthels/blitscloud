const express = require("express");  //requires (imports) the               //express package
const PORT = process.env.PORT || 5000;  //see below
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get("/api/hello", (req, res) => {
    res.status(200).send("Hello front-end!");
   });

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
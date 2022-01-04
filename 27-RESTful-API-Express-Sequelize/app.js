const express = require("express");
const app = express();
const HEWAN_MODEL = require("./models").hewan;
const port = 3000;
app.use(express.json());

app.get("/hewan", (req, res) => {
    HEWAN_MODEL.findAll().then((result) => {
        res.json({
            message: "OK",
            data: result,
        });
    });
});

app.get("/hewan/:id", (req, res) => {
    const hewanId = req.params.id;
    HEWAN_MODEL.findOne({
        where: {
            id: hewanId,
        },
    })
    .then((result) => {
        res.send({
            message: "OK",
            data: result,
        });
    })
    .catch((error) => {
        res.send({
          message: error,
        });
      });
});

app.post("/hewan", async (req, res) => {
    const body = req.body;
    const hewan = {
      name: body["name"],
      nameSpesies: body["nameSpesies"],
      umur: body["umur"]
    };

    try {
      await HEWAN_MODEL.create(hewan);
      res.status(201).send(hewan);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
});

app.patch("/hewan/:id", async (req, res) => {
    try {
      const todoId = req.params.id;
      const body = req.body;
      const hewan = {
        name: body["name"],
        nameSpesies: body["nameSpesies"],
      };
  
      await HEWAN_MODEL.update(hewan, {
        where: {
          id: todoId,
        },
      });
      res.status(200).json({
        message: "Updated",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  });


  app.delete("/hewan/:id", async (req, res) => {
    try {
      const todoId = req.params.id;
  
      await HEWAN_MODEL.destroy({
        where: {
          id: todoId,
        },
      });
  
      res.status(200).json({
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  app.listen("3000", () => {
    console.log(`server listening on port ${port}`);
  });

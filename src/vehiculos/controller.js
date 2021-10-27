const { VehiculosService } = require("./services");

const jwt = require("jsonwebtoken");

let token = null;

module.exports.VehiculosController = {
  login: (req, res) => {
    let { Email, Password } = req.body;
    if (Email === "admin" && Password === "admin") {
      //email y psw de ejemplo, podríamos crear una bd de usuarios para poder gestionar aquellos que pueden ingresar
      const payload = {
        check: true,
      };
      token = jwt.sign(payload, "123", {
        //lave 123 de ejemplo

        expiresIn: 1440, //24 hs
      });
      res.json({
        message: "Autenticación correcta",
        token: token,
      });
    } else {
      res.json({ message: "Email o contraseña incorrectos" });
    }
  },
  validate: async (req, res) => {
    res.json({
      token: token,
      UserData: {
        Email: "admin",
        Password: "admin",
      },
    });
  },
  getAll: async (req, res) => {
    try {
      let vehiculos = await VehiculosService.getAll();
      res.json({ vehiculos });
    } catch (err) {
      res.json({ error: err });
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      let vehiculo = await VehiculosService.getOne(id);
      if (vehiculo == null) {
        res.json({ vehiculo: "No encontrado" });
      }
      res.json({ vehiculo });
    } catch (err) {
      res.json({ error: err });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await VehiculosService.deleteOne(id);
      const { deletedCount } = result;
      if (deletedCount != 0) {
        res.json({ result: "ok" });
      } else {
        res.json({ result: "no se encontró" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body;
      const vehiculo = await VehiculosService.create(body);
      res.json({ vehiculo });
    } catch (err) {
      res.json({ error: err });
    }
  },
};

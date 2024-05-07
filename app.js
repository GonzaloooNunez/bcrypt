const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();
const usersRouter = require("./routes/users");
const { secret } = require("./crypto/config");
const PORT = 3000;

// Middleware para manejar sesiones
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para manejar el formulario de inicio de sesión y Middleware archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Rutas de usuarios
app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

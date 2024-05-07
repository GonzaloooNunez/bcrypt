const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersData = require("../data/users");
const authToken = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  const loginForm = `
      <form action="/login" method="post">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br>
      
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>
      
            <button type="submit">Iniciar sesión</button>
          </form>
          <a href="/dashboard">dashboard</a>
      
      `;

  res.send(loginForm);
});

//Endpoint para autenticar y generar un token JWT.
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usersData.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = authToken.generateToken(user);
    req.session.token = token;
    res.redirect("/dashboard");
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

//  Panel de control accesible solo con un token JWT válido.
router.get("/dashboard", authToken.verifyToken, (req, res) => {
  const userId = req.user;
  const user = usersData.users.find((u) => u.id === userId);

  if (user) {
    res.send(
      ` <h1>Bienvenido, ${user.name}!</h1> <p>Tu ID es: ${user.id}</p> 
      <p>Usuario llamado: ${user.username}, cuyo rol es:${user.rol}</p>
       <br> <form action="/logout" method="post"> 
       <button type="submit">Cerrar sesión</button> 
       </form> 
       <a href="/">home</a> `
    );
  } else {
    res.status(401).json({ message: "Usuario no encontrado" });
  }
});

//  Endpoint para cerrar sesión y destruir la sesión.
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

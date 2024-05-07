const express = require("express");

const users = [
  {
    id: 1,
    username: "gonzalo",
    password: "listocalisto",
    name: "Usuario Uno",
    rol: "Admin",
  },
  {
    id: 2,
    username: "usuario2",
    password: "contraseña2",
    name: "Usuario Dos",
    rol: "User",
  },
];

module.exports = { users };

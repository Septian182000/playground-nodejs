"use strict";

module.exports = (app) => {
  var json = require("../config/controller");

  app.get("/", json.index);

  app.get("/mahasiswa", json.showAllMahasiswa);

  app.get("/mahasiswa/:id", json.showMahasiswaById);

  app.post("/create", json.addMahasiswa);

  app.put("/update/:id", json.updateMahasiswa);

  app.delete("/delete/:id", json.deleteMahasiswa);
};

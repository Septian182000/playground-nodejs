"use strict";

const response = require("./res");
const connection = require("./database");

exports.index = (req, res) => {
  response.ok("REST API Success", res);
};

// show all mahasiswa
const getGender = (e) => {
  return e === "perempuan" ? 0 : 1;
};

exports.showAllMahasiswa = (req, res) => {
  const search = req.query.search;
  const gender = req.query.gender;

  let query = `SELECT * FROM mahasiswa `;

  if (search || gender) {
    query = `${query} WHERE`;

    if (!gender) {
      query = `${query} nama LIKE '%${search}%'`;
    } else if (!search) {
      query = `${query} gender = '${getGender(gender)}'`;
    } else {
      query = `${query} nama LIKE '%${search}%' AND gender = '${getGender(
        gender
      )}'`;
    }
  }

  connection.query(query, (error, rows, fileds) => {
    if (error) {
      console.log("error");
    } else {
      rows = rows.map((row) => {
        row.gender = row.gender === 0 ? "perempuan" : "laki-laki";
        return row;
      });
      response.ok(rows, res);
    }
  });
};

// show mahasiswa by id
exports.showMahasiswaById = (req, res) => {
  const id = req.params.id;
  connection.query(
    `select * from mahasiswa where id = ${id}`,
    (error, rows, fileds) => {
      if (error) {
        console.log("error");
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// add new mahasiswa
exports.addMahasiswa = (req, res) => {
  const npm = req.body.npm;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;
  const gender = req.body.gender;

  connection.query(
    `insert into mahasiswa (npm, nama, jurusan, gender) values('${npm}', '${nama}', '${jurusan}', ${gender})`,
    (error, rows, fileds) => {
      if (error) {
        console.error(error);
      } else {
        response.ok("Success to add mahasiswa", res);
      }
    }
  );
};

// update mahasiswa
exports.updateMahasiswa = (req, res) => {
  const id = req.params.id;
  const npm = req.body.npm;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;

  let query = "UPDATE mahasiswa SET ";

  if (npm) {
    query += `npm = '${npm}' `;
  }

  if (nama) {
    query += `nama = '${nama}' `;
  }

  if (jurusan) {
    query += `jurusan = '${jurusan}' `;
  }

  query += `WHERE id = ${id}`;

  connection.query(query, (error, rows, fileds) => {
    if (error) {
      console.error(error);
    } else {
      response.ok("Success update mahasiswa", res);
    }
  });
};

// delete mahasiswa
exports.deleteMahasiswa = (req, res) => {
  const id = req.params.id;

  connection.query(
    "delete from mahasiswa where id=" + id,
    (error, rows, fileds) => {
      if (error) {
        console.error(error);
      } else {
        response.ok("Success delete mahasiswa", res);
      }
    }
  );
};

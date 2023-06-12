"use strict";

const response = require("./res");
const connection = require("./database");
const util = require("util");

exports.index = (req, res) => {
  response.ok("REST API Success", res);
};

// show all mahasiswa
const getGender = (e) => {
  return e === "perempuan" ? 0 : 1;
};

exports.showAllMahasiswa = async (req, res) => {
  try {
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

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);
    const rows = queryResult.map((row) => {
      row.gender = row.gender === 0 ? "perempuan" : "laki-laki";
      return row;
    });

    response.ok(rows, res);
  } catch (error) {
    console.log("error");
  }
};

// show mahasiswa by id
exports.showMahasiswaById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `select * from mahasiswa where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);
    const rows = queryResult.map((row) => {
      row.gender = row.gender === 0 ? "perempuan" : "laki-laki";
      return row;
    });

    response.ok(rows, res);
  } catch (error) {
    console.log("error");
  }
};

// add new mahasiswa
exports.addMahasiswa = async (req, res) => {
  try {
    const npm = req.body.npm;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    const gender = req.body.gender;

    const query = `insert into mahasiswa (npm, nama, jurusan, gender) values('${npm}', '${nama}', '${jurusan}', ${gender})`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success to add mahasiswa", res);
  } catch (error) {
    console.error(error);
  }
};

// update mahasiswa
exports.updateMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const npm = req.body.npm;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    let query = "UPDATE mahasiswa SET ";

    if (npm && nama && jurusan) {
      query += `npm = '${npm}', nama = '${nama}', jurusan = '${jurusan}'`;
    } else {
      if (npm) {
        query += `npm = '${npm}'`;
      } else if (nama) {
        query += `nama = '${nama}'`;
      } else if (jurusan) {
        query += `jurusan= '${jurusan}'`;
      }
    }

    query += `WHERE id = ${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success update mahasiswa", res);
  } catch (error) {
    console.error(error);
  }
};

// delete mahasiswa
exports.deleteMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `delete from mahasiswa where id=${id}`;

    const queryAsync = util.promisify(connection.query).bind(connection);
    const queryResult = await queryAsync(query);

    response.ok("Success delete mahasiswa", res);
  } catch (error) {
    console.error(error);
  }
};

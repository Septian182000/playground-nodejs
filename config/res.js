"use strict";

exports.ok = (values, res) => {
  var data = {
    status_code: 200,
    values: values,
    status: "success",
  };

  res.json(data);
  res.end();
};

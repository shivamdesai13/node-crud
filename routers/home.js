const express = require("express");
//const res = require('express/lib/response');
const club = require("../models/club");
const Router = express.Router();
const Club = require("../models/club");

Router.get("/", (err, res) => {
  res.render("index");
});

//create or insert data
Router.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  //console.log(name,email)

  const club = new Club({
    name,
    email,
  });

  club.save((err) => {
    if (err) {
      console.log("error is");
    } else {
      res.redirect("/");
    }
  });
});

//find or show data

Router.get("/show", (req, res) => {
  Club.find((err, docs) => {
    if (err) throw err;

    res.render("show", {
      students: docs,
    });
  });
});

//update data

Router.get("/edit/:id", (req, res) => {
  // console.log(req.params.id)

  Club.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        console.log("error in update");
      } else {
        //console.log("update successfull")
        res.render("edit", { studentdata: docs });
      }
    }
  );
});

Router.post("/edit/:id", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        console.log("error in ");
      } else {
        res.redirect("/show");
      }
    }
  );
});

// delete data

Router.get("/delete/:id", (req, res) => {
  Club.findByIdAndDelete({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("error in delete");
    } else {
      //console.log("delete successfull")
      res.redirect("/show");
    }
  });
});

module.exports = Router;

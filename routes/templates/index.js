/*
 * All template routes for localhost:8080:/ are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  //GET /
  router.get("/", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        const firstTripletOrderedListings = orderedListings.slice(0, 3);
        const secondTripletOrderedListings = orderedListings.slice(3, 6);
        // TODO: IMPLEMENT PAGE STATUS BY setting a page cookie
        // res.cookie("PageOne", 1);
        const templateVars = {
          orderedListings,
          firstTripletOrderedListings,
          secondTripletOrderedListings,
          emailCookie: req.cookies.email,
        };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get("/search", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    makeRequest(
      `http://localhost:8080/api/listings/search?title=${req.query.title}&minimum_price=${req.query.minimum_price}&maximum_price=&${req.query.maximum_price}condition=${req.query.condition}`
    )
      .then((listings) => {
        templateVars["orderedListings"] = JSON.parse(listings);
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  router.get("/nextpage", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings/page`)
      .then((listings) => {
        let start = 6;
        let end = 9;
        const orderedListings = JSON.parse(listings);
        const firstTripletOrderedListings = orderedListings.slice(start, end);
        const secondTripletOrderedListings = orderedListings.slice(
          end,
          end + 3
        );
        const templateVars = {
          orderedListings,
          firstTripletOrderedListings,
          secondTripletOrderedListings,
          emailCookie: req.cookies.email,
        };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //TODO!!!!
  router.get("/previouspage", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    makeRequest()
      .then((listings) => {
        templateVars["orderedListings"] = JSON.parse(listings);
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};

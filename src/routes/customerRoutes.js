const express = require("express");

//access the customer.json data
const customerData = require("../customers.json");

const router = express.Router();

//handle the routes
router.get("/", (req, res, next) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const email = req.query.email;
  const car_make = req.query.car_make;
  const sort = req.query.sort;
  const limit = +req.query.limit;
  const page = +req.query.page;

  let filteredData;

  //to check is that any query params exists.
  if (Object.keys(req.query).length > 0) {
    if (first_name) {
      filteredData = customerData.filter(
        (customer) =>
          customer.first_name.toLowerCase() === first_name.toLowerCase()
      );
    }
    if (last_name) {
      if (filteredData) {
        filteredData = filteredData.filter(
          (customer) =>
            customer.last_name.toLowerCase() === last_name.toLowerCase()
        );
      } else {
        filteredData = customerData.filter(
          (customer) =>
            customer.last_name.toLowerCase() === last_name.toLowerCase()
        );
      }
    }
    if (gender) {
      if (filteredData) {
        filteredData = filteredData.filter(
          (customer) => customer.gender.toLowerCase() === gender.toLowerCase()
        );
      } else {
        filteredData = customerData.filter(
          (customer) => customer.gender.toLowerCase() === gender.toLowerCase()
        );
      }
    }
    if (email) {
      if (filteredData) {
        filteredData = filteredData.filter(
          (customer) => customer.email.toLowerCase() === email.toLowerCase()
        );
      } else {
        filteredData = customerData.filter(
          (customer) => customer.email.toLowerCase() === email.toLowerCase()
        );
      }
    }
    if (car_make) {
      if (filteredData) {
        filteredData = filteredData.filter(
          (customer) =>
            customer.car_make.toLowerCase() === car_make.toLowerCase()
        );
      } else {
        filteredData = customerData.filter(
          (customer) =>
            customer.car_make.toLowerCase() === car_make.toLowerCase()
        );
      }
    }
    if (limit && page) {
      const dataToSkip = (page - 1) * limit;
      if (filteredData) {
          if(filteredData.length < limit){
              filteredData = [...filteredData]
          }
          else{

              filteredData = filteredData.slice(dataToSkip, dataToSkip + 10);
          }
      } else {
        filteredData = customerData.slice(dataToSkip, dataToSkip + 10);
      }
    }
  } else {
    filteredData = [...customerData];
  }

  if (sort) {
    const sortby = sort.split(":")[0];
    const criteria = sort.split(":")[1];
    let arrayToSort = filteredData || customerData;

    if (sortby === "first_name") {
        if(criteria === 'DESC'){
            arrayToSort.sort((a, b) => {
                if (a.first_name > b.first_name) return -1;
                if (a.first_name < b.first_name) return 1;
                return 0;
              });
        }
        else {
            arrayToSort.sort((a, b) => {
                if (a.first_name > b.first_name) return 1;
                if (a.first_name < b.first_name) return -1;
                return 0;
              });
          }
    } 
    else{
        if(criteria === 'DESC'){
            arrayToSort.sort((a, b) => {
                if (a.last_name > b.last_name) return -1;
                if (a.last_name < b.last_name) return 1;
                return 0;
              });
        }
        else {
            arrayToSort.sort((a, b) => {
                if (a.last_name > b.last_name) return 1;
                if (a.last_name < b.last_name) return -1;
                return 0;
              });
          }
    }
    filteredData = [...arrayToSort];
  }

  if (filteredData.length > 0) {
    res.status(201).json({ customerData: filteredData });
  } else {
    res.status(400).status({ message: "Data not found!!!" });
  }
});

router.get("/list", (req, res, next) => {
  const filterby = req.query.filterBy;
  const filterParam = req.query.filter;
  if (filterby && !filterParam) {
    return res.status(500).json({ message: "Wrong Crieteia" });
  }
  let filteredData;

  if (Object.keys(req.query).length > 0) {
    if (filterby) {
      switch (filterby) {
        case "first_name":
          filteredData = customerData.filter(
            (customer) => customer.first_name == filterParam
          );

          break;
        case "last_name":
          filteredData = customerData.filter(
            (customer) => customer.last_name == filterParam
          );
          break;

        default:
          filteredData = [];
          break;
      }
    } else {
      filteredData = customerData.filter(
        (customer) =>
          customer.first_name == filterParam ||
          customer.last_name == filterParam
      );
    }
  } else {
    filteredData = [...customerData];
  }

  if (filteredData.length > 0) {
    res.status(201).json({ customerData: filteredData });
  } else {
    res.status(400).status({ message: "Data not found!!!" });
  }
});

module.exports = router;

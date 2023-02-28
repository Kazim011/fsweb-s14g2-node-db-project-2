const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");
const db = require("../../data/db-config");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const { id } = req.params;
    const isExist = await carsModel.getById(id);
    if (!isExist) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.car = isExist; // const {car} = req.body
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS

  try {
    const rows = ["vin", "make", "model", "mileage"];

    rows.forEach((row) => {
      req.body[row] === undefined &&
        res.status(400).json({ message: `${row} is missing` });
    });
  } catch (error) {
    next(error);
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  const { vin } = req.body;
  vinValidator.validate(vin)
    ? next()
    : res.status(400).json({ message: `vin ${vin} is invalid` });
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const { vin } = req.body;
    const existCars = await db("cars").where("vin", vin).first();
    existCars
      ? res.status(400).json({ message: `vin ${vin} already exists` })
      : next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

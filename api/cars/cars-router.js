// HOKUS POKUS
const router = require("express").Router();
const CarsModel = require("./cars-model");
const MDW = require("./cars-middleware");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = MDW;

router.get("/", async (req, res, next) => {
  try {
    const allCars = await CarsModel.getAll();
    res.json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      let instersData = await CarsModel.create(req.body);
      res.json(instersData);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", checkCarId, checkCarPayload, async (req, res, next) => {
  try {
    let updatedCars = await CarsModel.update(req.params.id, req.body);
    console.log(updatedCars);
    res.json(updatedCars);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkCarId, async (req, res, next) => {
  try {
    const deletedCars = await CarsModel.deletebyId(req.params.id);
    res.json(deletedCars);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    customMessage: "Hata oluştu...",
    message: error.message,
  });
});

module.exports = router;

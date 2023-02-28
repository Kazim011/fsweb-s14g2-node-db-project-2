const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where({ id }).first();
};

const create = (newCar) => {
  // HOKUS POKUS
  return db("cars")
    .insert(newCar)
    .then((insertId) => {
      return getById(insertId[0]);
    });
};

const update = async (id, cars) => {
  await db("cars").where({ id: id }).update(cars);
  return getById(id);
};

const deletebyId = async (id) => {
  const deletedCars = await getById(id);
  await db("cars").where({ id }).del();
  return deletedCars;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletebyId,
};

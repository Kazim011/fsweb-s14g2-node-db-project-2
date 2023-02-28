// ESNEK
const defaultCars = [
  {
    vin: "123",
    make: "Volkswagen",
    model: "Golf",
    mileage: 12345,
  },
  {
    vin: "1234",
    make: "Volkswagen",
    model: "Golf",
    mileage: 12345,
  },
  {
    vin: "12345",
    make: "Volkswagen",
    model: "Golf",
    mileage: 12345,
  },
  {
    vin: "123456",
    make: "Volkswagen",
    model: "Golf",
    mileage: 12345,
  },
];

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(defaultCars);
};

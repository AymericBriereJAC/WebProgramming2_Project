const { getCarCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");

/**
 * Inserts a new car document into the database.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {number} year - The year of the car.
 * @param {string} description - The description of the car.
 * @param {string} image - The image url of the car.
 *
 * @throws {InvalidInputError} If the make, model, or year is invalid.
 * @throws {DatabaseError} If there is an error adding the car document.
 * @returns {Promise<boolean>} Returns true if the car was successfully added.
 */
async function addCar(make, model, year, description, image) {
  validateUtils.isValidCar(make, model, year);

  const car = {
    make: make,
    model: model,
    year: year,
    description: description,
    image: image,
  };

  if (
    await getCarCollection().findOne({
      make: car.make,
      model: car.model,
      year: car.year,
    })
  )
    throw new InvalidInputError("Cannot add car: car already in the database");

  const carToAdd = await getCarCollection().insertOne(car);

  if (!carToAdd)
    throw new DatabaseError("Database error: Could not add the car");
  return car;
}

/**
 * Retrieves a single car document from the database based on make, model, and year.
 * @param {string} make - The make of the car.
 * @param {string} model - The model of the car.
 * @param {number} year - The year of the car.
 * @throws {Error} If no car document is found.
 * @throws {DatabaseError} If there is an error getting the car document.
 * @returns {Promise<object>} Returns the car document as an object if found.
 */
async function getSingleCar(make, model, year) {
  try {
    validateUtils.isValidCar(make, model, year);
    const query = { make: make, model: model, year: year };
    let result = await getCarCollection().findOne(query);
    if (result === null) {
      throw new DatabaseError("No car found");
    }
    return result;
  } catch (e) {}
  logger.warn("Error while trying to get a car" + e.message);
  if (e instanceof InvalidInputError)
    throw new InvalidInputError(
      `Invalid input for getting a car of ${make} ${model} ${year}: ${e.message}`
    );
  if (e instanceof DatabaseError)
    throw new DatabaseError(
      `Database error while getting a car of ${make} ${model} ${year}: ${e.message}`
    );
  else throw e;
}

/**
 * Gets all cars from the database.
 * @throws {DatabaseError} - If an error occurs while getting the cars from the database.
 * @returns {Promise<Array>} - An array of all cars in the database.
 */
async function getAllCars() {
  const results = await getCarCollection().find({}).toArray();
  if (results.length == 0) {
    throw new DatabaseError("No cars were found");
  }
  return results;
}

/**
 * Deletes a single car from the database.
 * @param {Object} car - The car to be deleted from the database.
 * @throws {InvalidInputError} If the make, model, or year is empty or invalid.
 * @throws {DatabaseError} If an error occurs while deleting the car from the database.
 * @returns {Promise<boolean>} Returns true if the car was successfully deleted.
 */
async function deleteSingleCar({ make, model, year }) {
  try {
    validateUtils.isValidCar(make, model, year);

    const query = {
      make: make,
      model: model,
      year: year,
    };

    let carDelete = await getCarCollection().deleteOne(query);

    if (carDelete.deletedCount == 0)
      throw new DatabaseError(`Delete ${make} ${model} ${year} failed.`);

    return true;
  } catch (e) {
    logger.warn(`Error while deleting ${(make, model, year)}: ${e.message}`);
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for deleting car: ${(make, model, year)}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while deleting car:
        ${(make, model, year)}: ${e.message}`
      );
    else throw e;
  }
}

/**
 * Updates an existing car in the database with new information.
 * @param {Object} car - The car object to update in the database.
 * @param {Object} updatedCar - The updated car object with new information.
 * @param {string} updatedCar.make - The make of the updated car.
 * @param {string} updatedCar.model - The model of the updated car.
 * @param {number} updatedCar.year - The year of the updated car.
 * @throws {InvalidInputError} If the updated version of the car is already in the database.
 * @throws {DatabaseError} If there was an error updating the car in the database.
 * @returns {boolean} Returns true if the car was successfully updated in the database.
 */
async function updateCar(car, updatedCar) {
  try {
    let updatedNewCar = await getCarCollection().updateOne(car, {
      $set: {
        make: updatedCar.make,
        model: updatedCar.model,
        year: updatedCar.year,
        description: updatedCar.description,
        image: updatedCar.image,
      },
    });
    if (updatedNewCar.matchedCount == 0)
      throw new DatabaseError(
        `Updating the car: ${(car.make, car.model, car.year)} failed.`
      );
    return true;
  } catch (e) {
    logger.warn(
      `Error while trying to update a car: ${(car.make, car.model, car.year)}` +
        e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating the car: ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating the car: ${
          (car.make, car.model, car.year)
        }: ${e.message}`
      );
    else throw e;
  }
}

module.exports = {
  addCar,
  getSingleCar,
  getAllCars,
  deleteSingleCar,
  updateCar,
};

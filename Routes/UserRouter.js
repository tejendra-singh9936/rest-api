const express = require("express");
const router = express.Router();
const UserModel = require("../DB/userSchema");

//Create a new User

router.post("/user", async (req, res, next) => {
  try {
    //Validating the request
    const { name, email, mobile, address } = req.body;
    if (!name && !email && !mobile && !address)
      throw createError.BadRequest("all feilds are required");

    //Creating the user
    const userDetails = new UserModel(req.body);

    //Saving the user in the database
    const user = await userDetails.save();
    if (!user) throw createError.res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update an Existing User

router.put("/user/:id", async (req, res, next) => {
  try {
    //Validating the request

    if (!req.body)
      throw createError.BadRequest("Data to update can not be empty");

    if (!req.params.id) throw createError.BadRequest("Invalid request");
    const id = req.params.id;

    //Find the user by Id and update the user

    const updateUser = await UserModel.findByIdAndUpdate(id, req.body);
    if (!updateUser)
      throw createError.NotFound(
        `Cannot update user with id=${id}. Maybe user was not found!`
      );
    res.json({ message: "User was updated successfully." });
  } catch (error) {
    next(error);
  }
});

// Delete an User

router.delete("/user/:id", async (req, res, next) => {
  try {
    //Validating the request
    const id = req.params.id;
    if (!id) throw createError.BadRequest();

    // Find the user by Id and Delete the user

    const deletedUserDetail = await UserModel.findByIdAndDelete(id);
    if (!deletedUserDetail)
      throw createError.NotFound(
        `Cannot delete User with id=${id}. Maybe User was not found!`
      );
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
});

//   Get all Users
//------- Get all Users sorted by their distance from coordinates passed in the query param of the Endpoint.
router.get("/user", async (req, res, next) => {
  try {
    //If no query parameters are present then return all the User

    if (Object.keys(req.query).length === 0) {
      const userDetails = await UserModel.find();
      if (!userDetails) throw createError.NotFound();
      res.json({ userDetails });
    } else {
      //Else sort the users by their distance passed in the query param

      const long = parseFloat(req.query.long);
      const lat = parseFloat(req.query.lat);

      const userDetails = await UserModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [long, lat],
            },
            distanceField: "dist.calculated",
            minDistance: 1,
            spherical: true,
          },
        },
      ]);
      if (!userDetails) throw createError.NotFound();
      res.json({ userDetails });
    }
  } catch (error) {
    next(error);
  }
});

// Get all Users sorted by createdAt timestamp with Pagination
router.get("/user/:pagenumber", async (req, res, next) => {
  try {
    const pagesize = 3;
    //Validating the request
    if (!req.params) throw createError.BadRequest("Invalid request");
    const n = req.params.pagenumber;

    // Sorting all the users by createdAt timestamp

    const userDetails = await UserModel.find()
      .sort({ createdAt: 1 })
      .skip(pagesize * (n - 1))
      .limit(pagesize);
    if (!userDetails) throw createError.NotFound();
    res.json({ userDetails });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

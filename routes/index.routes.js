const router = require("express").Router()
const UserController = require("../controllers/index.controller")
const { CheckToken } = require("../utils/auth")


router.get("/my-movies/:email/:token", CheckToken, UserController.GetFavoriteMovies)
router.post("/my-movies", CheckToken, UserController.AddFavoritMovies)
router.delete("/my-movies", CheckToken, UserController.RemoveFavoritMovies)

// user signIn Token 
router.post("/my-token", UserController.SignInToken)

// user singOut Token
router.delete("/my-token", CheckToken, UserController.SingOutToken)

//signup user
router.post("/sign-up", UserController.SingUpUser)

module.exports = router
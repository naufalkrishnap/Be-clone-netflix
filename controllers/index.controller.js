const { ERR, OK } = require("../utils/response")
const { User } = require("../models/index.model")
const argon2 = require("argon2")

const GetFavoriteMovies = async (req, res) => {
    return OK(res, 200, req.user, "Get favorit movies suskses")
}

const AddFavoritMovies = async (req, res) => {
    try {
        //mengabil data  film  dari clien
        const { data } = req.body

        //ambil data dari mongoose
        const user = await User.findById(req.user._id)

        //menentukan key apa yang akan di update
        user.favoriteMovies.push(data)

        //action
        await user.save()
        return OK(res, 201, user.favoriteMovies, "ADD favorit movies")
    } catch (error) {
        return ERR(res, 500, "ERROR ADD FAVORITMOVIES")
    }
}
const RemoveFavoritMovies = async (req, res) => {
    try {
        const { moviesId } = req.body

        //ambil data dari mongoose
        const user = await User.findById(req.user._id)

        const existingMovie = user.favoriteMovies.some(movie => movie.id == moviesId)

        if (!existingMovie) return ERR(res, 404, "Movies ID not found!")

        user.favoriteMovies = user.favoriteMovies.filter(movie => movie.id !== moviesId)


        await user.save()

        return OK(res, 204, null, "Remove favorit movies")
    } catch (error) {
        return ERR(res, 500, "Remove ADDFAVORITMOVIES")
    }
}

const SignInToken = async (req, res) => {
    try {
        const { email, password, token } = req.body
        let user = await User.findOne({ email })

        if (!user) return ERR(res, 400, "User Not Found!")
        const isPasswordOK = await argon2.verify(user.password, password)

        if (!isPasswordOK) return ERR(res, 400, "Password wrong!")

        user.token = token

        await user.save()

        return OK(res, 200, null, "SignIn Token saved")
    } catch (error) {
        return ERR(res, 500, "Error SignIn Token")
    }
}

const SingOutToken = async (req, res) => {
    const user = await User.findById(req.user._id)
    user.token = null

    await user.save()
    return OK(res, 204, "SignOut sukses")
}

const SingUpUser = async (req, res) => {
    const { email, password } = req.body
    const hashPass = await argon2.hash(password)

    try {
        const user = await User.findOne({ email })

        if (user) return ERR(res, 400, "Email not avaible!")

        const addNewUser = new User({ email, password: hashPass })
        await addNewUser.save()

        return OK(res, 201, addNewUser._id, "Sing-up sukses!")
    } catch (err) {
        console.log("error", err)
        return ERR(res, 500, "sing-out failed!")
    }
}

module.exports = { GetFavoriteMovies, AddFavoritMovies, RemoveFavoritMovies, SignInToken, SingOutToken, SingUpUser }
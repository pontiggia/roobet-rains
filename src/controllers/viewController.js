import User from "../models/userModel.js";
import Rain from "../models/rainModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import { coinName, pageName } from "../utils/globalVariables.js";

/* export const getOverview = catchAsync(async (req, res, next) => {
    res.status(200).render("base", {
        title: "Overview",
    });
}); */

export const home = (req, res) => {
    res.render("home", {
        title: `Home | ${pageName}`,
        pagename: pageName,
        coinname: coinName,
        isUser: req.user
    });
};


export const getLogin = (req, res) => {
    res.render("login", {
        title: `Login | ${pageName}`,
        pagename: pageName,
        inLogin: true
    });
}

export const getRegister = (req, res) => {
    res.render("signUp", {
        title: `Register | ${pageName}`,
        pagename: pageName,
        inLogin: true
    });
}
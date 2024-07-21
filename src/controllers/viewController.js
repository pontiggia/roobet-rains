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

export const home = catchAsync(async (req, res, next) => {
    res.render("home", {
        title: `Home | ${pageName}`,
        pagename: pageName,
        coinname: coinName,
    });
});

export const getLogin = catchAsync(async (req, res, next) => {
    res.render("login", {
        title: `Login | ${pageName}`,
        pagename: pageName,
        inLogin: true
    });
});

export const getRegister = catchAsync(async (req, res, next) => {
    res.render("signUp", {
        title: `Register | ${pageName}`,
        pagename: pageName,
        inLogin: true
    });
});
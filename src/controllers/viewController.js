import User from "../models/userModel.js";
import Rain from "../models/rainModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import { pageName } from "../utils/globalVariables.js";

/* export const getOverview = catchAsync(async (req, res, next) => {
    res.status(200).render("base", {
        title: "Overview",
    });
}); */

export const renderBase = (req, res) => {
    res.render("base", {
        title: "Base View"
    });
};

export const home = (req, res) => {
    res.render("home", {
        title: "Home View",
        pagename: pageName
    });
};

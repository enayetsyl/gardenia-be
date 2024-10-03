"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/User/user.route");
const auth_route_1 = require("../module/Auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array
exports.default = router;

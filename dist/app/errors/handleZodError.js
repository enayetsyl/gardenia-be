"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// You can read the following blog to learn more about the code https://dev.to/md_enayeturrahman_2560e3/how-to-handle-errors-in-an-industry-grade-nodejs-application-217b
// Todo without further modification you can use the code. If you want to customize the error message then you can do so. 
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;

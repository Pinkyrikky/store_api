"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const todo_1 = __importDefault(require("./routes/todo"));
const users_1 = __importDefault(require("./routes/users"));
const page_1 = __importDefault(require("./routes/page"));
const products_1 = __importDefault(require("./routes/products"));
const databaseConfig_1 = __importDefault(require("./config/databaseConfig"));
// import { v2 as cloudinary } from 'cloudinary';
// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });
// // Log the configuration
// console.log(cloudinary.config());
var app = (0, express_1.default)();
//Connecting to database
databaseConfig_1.default.sync({ force: true }).then(() => {
    console.log("Database connected succesfully");
}).catch(err => {
    console.error("Error connecting to Database", err);
});
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/todo', todo_1.default);
app.use('/users', users_1.default);
app.use('/', page_1.default);
app.use('/products', products_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;

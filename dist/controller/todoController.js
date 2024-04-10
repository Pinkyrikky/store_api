"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.upDateTodo = exports.getSingleTodo = exports.getTodos = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const todoModel_1 = require("../model/todoModel");
const createTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verified = req.user;
            const iduuid = (0, uuid_1.v4)();
            //validation with joi
            const validateResult = utils_1.CreateTodoSchema.validate(req.body, utils_1.option);
            if (validateResult.error) {
                res.status(400).json({ Error: validateResult.error.details[0].message });
            }
            const totoRecord = yield todoModel_1.TodoInstance.create(Object.assign(Object.assign({ id: iduuid }, req.body), { userId: verified.id }));
            return res.status(201).json({
                msg: "Todo created successfully",
                totoRecord,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const getAllTodo = yield todoModel_1.TodoInstance.findAndCountAll({
            limit: limit,
            offset: offset,
        });
        return res.status(200).json({
            msg: "Todos succesffully fetched",
            count: getAllTodo.count,
            todo: getAllTodo.rows,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTodos = getTodos;
const getSingleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getOneTodo = yield todoModel_1.TodoInstance.findOne({ where: { id: id } });
        if (!getOneTodo) {
            return res.status(400).json({
                error: "cannot find todo"
            });
        }
        return res.status(200).json({
            msg: 'The todo has been found',
            todo: getOneTodo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleTodo = getSingleTodo;
const upDateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Extract parameter from the req.body
        const { description, completed } = req.body;
        const { id } = req.params;
        //VALIDATE WITH JOI
        const validateResult = utils_1.UpdateTodoSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const upDateTodo = yield todoModel_1.TodoInstance.findOne({ where: { id: id } });
        if (!upDateTodo) {
            return res.status(400).json({
                error: "cannot find todo"
            });
        }
        const updateRecord = yield upDateTodo.update({ description, completed });
        return res.status(200).json({
            msg: "todo has been updated successfully",
            upDateTodo
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.upDateTodo = upDateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield todoModel_1.TodoInstance.findOne({ where: { id: id } });
        if (!record) {
            return res.status(400).json({
                error: 'The provided ID does not exist.'
            });
        }
        const deleteRecord = yield record.destroy();
        res.status(200).json({
            message: 'Deleted Successfully',
            deleteRecord
        });
        // const foundItem=await TodoInstance.destroy({where:{id}});
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTodo = deleteTodo;

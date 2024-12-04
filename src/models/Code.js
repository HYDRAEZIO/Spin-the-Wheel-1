"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CodeSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    prize: { type: String, required: true },
});
exports.default = mongoose_1.models.Code || (0, mongoose_1.model)("Code", CodeSchema);

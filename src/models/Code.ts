import mongoose, { Schema, model, models } from "mongoose";

const CodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  prize: { type: String, required: true },
});

const Code = models.Code || model("Code", CodeSchema);

export default Code;
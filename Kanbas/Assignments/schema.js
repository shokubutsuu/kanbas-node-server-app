import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
 {
   title: String,
   course: String,
 },
 { collection: "assignments" }
);
export default assignmentSchema;
import model from "./model.js";

export function updateAssignment(assignmentId, assignmentUpdates) {
    console.log(assignmentId);
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  }
  
export function deleteAssignment(assignmentId) {
   return model.deleteOne({_id: assignmentId});
}

export function findAssignmentsForCourse(courseNumber) {
    // console.log("assignment dao",courseNumber)
    return model.find({course:courseNumber})
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
}
export function createAssignment(assignment) {
    delete assignment._id;
    return model.create(assignment);
}

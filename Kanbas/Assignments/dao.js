import assignments from "../Database/assignments.js";
import Database from "../Database/index.js";
import model from "./model.js";
export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function findAssignmentsForCourse(courseNumber) {
    // console.log("assignment dao",courseNumber)
    return model.find({course:courseNumber})
    
    
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
}
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

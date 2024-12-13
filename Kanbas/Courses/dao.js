import model from "./model.js";

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}
   
export function findAllCourses() {
    return model.find();
}
export function findCourseByID(id){
    return model.findById(id)
}

export function createCourse(course) {
    delete course._id;
    return model.create(course);
}
export function findModulesForCourse(course){
    return model.find({course: course});
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    
}
   

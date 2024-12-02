import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    console.log('userId: ', userId, ", courseId: ", courseId)
    const enrollmentExists = enrollments.some(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );

    if (enrollmentExists) {
        throw new Error("User is already enrolled in the course.");
    }
    enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
    const result = enrollments.filter((e) => e.user === userId)
    return result;
}

export function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const enrollmentIndex = enrollments.findIndex(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (enrollmentIndex !== -1) {
        enrollments.splice(enrollmentIndex, 1);
    } else {
        throw new Error(`Enrollment for user ${userId} in course ${courseId} not found.`);
    }
    const result = enrollments.filter((e) => e.user === userId)
    return result;
}

export function findUsersByCourse(courseId){
    const {enrollments} = Database;
    const result = enrollments.filter(
        (enrollment) =>  enrollment.course === courseId
    ); 
    return result;
}





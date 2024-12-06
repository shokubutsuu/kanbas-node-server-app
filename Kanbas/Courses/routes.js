import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assingmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as usersDao from "../Users/dao.js";
import * as quizzesDao from "../Quizzes/dao.js";

export default function CourseRoutes(app) {
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = assingmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    })
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assingmentsDao.findAssignmentsForCourse(courseId);
        console.log(assignments)
        res.send(assignments);
    })

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.get("/api/courses/:courseId/users", (req, res) => {
        const { courseId } = req.params;
        const enrollments = enrollmentsDao.findUsersByCourse(courseId);
        const users = usersDao.findAllUsers();
        const enrolledUsers = users.filter((user) => enrollments.find((e) => e.user === user._id))
        res.json(enrolledUsers);
    }
    );
    app.get("/api/courses/:courseId/quizzes", (req, res)=>{
        const { courseId } = req.params;
        const quizzes = quizzesDao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    })

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });
   

}

import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assingmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as usersDao from "../Users/dao.js";



export default function CourseRoutes(app) {
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await assingmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    })
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const targetCourse = await dao.findCourseByID(courseId)
        const assignments = await assingmentsDao.findAssignmentsForCourse(targetCourse.number);
        // console.log(assignments)
        res.send(assignments);
    })

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    // app.get("/api/courses/:courseId/users", async (req, res) => {
    //     const { courseId } = req.params;
    //     const enrollments = enrollmentsDao.findUsersByCourse(courseId);
    //     const users = await usersDao.findAllUsers();
    //     const enrolledUsers = users.filter((user) => enrollments.find((e) => e.user === user._id))
    //     res.json(enrolledUsers);
    // }
    //);
    app.get("/api/courses/:cid/users", async (req,res)=>{
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        //console.log("finding people enrolled", cid, users)
        res.json(users);
    });


    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });


    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
       // console.log(courses)
        res.send(courses);
    });
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }

        res.json(course);
    });
    
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });




}

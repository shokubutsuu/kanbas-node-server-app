import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

  };
  const signup = (req, res) => {
    console.log(req.body.username);
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const enrollUserInCourse = (req, res) =>{
    const currentUser = req.session["currentUser"];
    console.log("currentUser: ",currentUser)
    let {courseId} = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    const courses = courseDao.findCoursesForEnrolledUser(currentUser._id);

    res.json(courses)
    
    // try{
    //   const enrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    //   res.json(enrollment)
    // }catch (error){
    //   res.status(400).json({ message: "course already enrolled." });
    //   return;
    // }
  }

  const unenrollUserInCourse = (req, res) =>{
    const currentUser = req.session["currentUser"];
    let {courseId} = req.params;
    try{
      const enrollment = enrollmentsDao.unenrollUserInCourse(currentUser._id, courseId);
      const courses = courseDao.findCoursesForEnrolledUser(currentUser._id);

    res.json(courses)
    }catch (error){
      res.status(400).json({ message: "course already unenrolled." });
      return;
    }
  }

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };


  app.post("/api/enroll/:courseId", enrollUserInCourse);
  app.post("/api/unenroll/:courseId", unenrollUserInCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

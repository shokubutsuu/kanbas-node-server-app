import * as assigmentsDao from "./dao.js";
export default function AssignmentRoutes(app){
    app.put("api/assignments/:assignmentId", async (req, res) =>{
        const {assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await assigmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        req.send(status);
    });

    app.delete("api/assignments/:assignmentId", async (req, res) =>{
        const {assignmentId} = req.params;
        const status = await assigmentsDao.deleteAssignment(assignmentId);
        req.send(status);
    });

}
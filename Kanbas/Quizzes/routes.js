import * as quizzesDao from "./dao.js";
export default function QuizzesRoute(app){
    app.put("api/quizzes/:quizId", async (req, res) =>{
        const {quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });

    app.delete("api/quizzes/:quizId", async (req, res) =>{
        const {quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.deleteQuiz(quizId, quizUpdates);
        res.send(status);
    });


}
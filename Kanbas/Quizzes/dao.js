import Database from "../Database/index.js";
export function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = Database;
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    Object.assign(quiz, quizUpdates);
    return quiz;
  }
  
export function deleteQuiz(quizId) {
    const { quizzes } = Database;
    Database.quizzes = quizzes.filter((quiz) => quiz.id !== quizId);
}

export function findQuizzesForCourse(courseId) {
    const { quizzes } = Database;
    return quizzes.filter((quiz) => quiz.course === courseId);
}
export function createQuiz(quiz) {
    const newQuiz = { ...quiz, id: Date.now().toString() };
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}

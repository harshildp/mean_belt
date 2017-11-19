var questionController = require('../controllers/questions');

module.exports = app => {
    app
        .post('/login', questionController.login)
        .get('/dashboard', questionController.getAll)
        .post('/questions/add', questionController.add)
        .get('/questions/:qid', questionController.getAnswers)
        .post('/questions/answer/:qid', questionController.answer)
        .get('/questions/like/:aid', questionController.like)       
        .get('/logout', questionController.logout)
        
        .all("*", (req,res,next) => {
            res.sendFile(path.resolve("./public/dist/index.html"))
        })
}
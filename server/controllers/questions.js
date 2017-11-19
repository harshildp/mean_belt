var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
    login: function(req, res) {
        req.session.name = req.body.name;
        return res.json({login:'successful'})
    },
    getAll: function(req, res) {
        Question.find({}, function(err, questions) {
            if (err) {
                console.log(err);
            } else {
                console.log('all questions', questions)
                return res.json(questions);
            }
        })
        // Question.find({}).populate('answers').exec(function(err, questions) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('all questions', questions)
        //         return res.json(questions)
        //     }
        // })
    },
    add: function (req, res) {
        let question = new Question(req.body);
        question.save(function(err){
            if (err) {
                console.log(err);
                return res.json({postQuestion: 'failed'})
            }
            else {
                return res.json({question:'posted'})
            }
        })
    },
    answer: function(req, res) {
        Question.findOne({ _id: req.params.qid }, function (err, question) {
            console.log('found question', question)
            var answer = new Answer(req.body);
            answer._question = question._id;
            answer.save(function (err) {
                console.log('answer', answer);
                console.log('errors', err);
                question.answers.push(answer);
                question.save(function (err) {
                    console.log(question)
                    if (err) {
                        console.log(err);
                    }else {
                        res.json({Submitanswer:'success'})
                    }
                });
            });
        })
    },
    like: function(req, res) {
        Answer.findOne({_id: req.params.aid}, function(err, result) {
            console.log('Answer found', result)
            let like = result.likes + 1
            result.update({likes: like}, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({Updatedlikes: 'yes'});
                }
            })
        })
    },
    logout: function(req, res) {
        req.session.destroy();
        return res.json({logout:'successful'})
    },
    getAnswers: function(req, res) {
        Question.find({_id: req.params.qid}).populate('answers').exec(function (err, answers) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Node my question answers', answers);
                return res.json(answers[0]);
            }
        })
    }
}
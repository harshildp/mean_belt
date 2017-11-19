var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        minLength: 2
    },
    desc: {
        type: String,
        default: ''
    },
    answers: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer' 
    }],
}, { timestamps: true });

var Question = mongoose.model('Question', QuestionSchema);
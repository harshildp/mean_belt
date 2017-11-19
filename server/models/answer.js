var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
        minLength: 5
    },
    details: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    _question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
}, { timestamps: true });

var Answer = mongoose.model('Answer', AnswerSchema);
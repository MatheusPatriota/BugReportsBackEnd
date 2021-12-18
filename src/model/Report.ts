import * as Utils from '../utils/utils';

const ReportScheme = new Utils.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    active: {type: Boolean, default: true},
    created:{type: Date, default: Date.now},
    closedAt:{type: Date, required: false},
    underInvestigation: {type: Boolean, default: false},
    solved: {type: Boolean, default: false},
});

module.exports = mongoose.model('Report', ReportScheme);
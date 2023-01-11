"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const pdf_merger_js_1 = __importDefault(require("pdf-merger-js"));
const pdfmerger = new pdf_merger_js_1.default();
let storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const mult = (0, multer_1.default)({ storage: storage });
const app = (0, express_1.default)();
app.use('/pdf', express_1.default.static(__dirname + '/templates/merged.pdf'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../templates/index.html'));
});
app.post('/', mult.array('pdfs', 2), (req, res) => {
    if (req.files && Array.isArray(req.files)) {
        console.log(req.files[0].path);
        pdfmerger.add('./' + req.files[0].path);
        pdfmerger.add('./' + req.files[1].path);
        pdfmerger.save('templates/merged.pdf');
        return res.redirect('/pdf');
    }
    return res.json({ "error": "no files" });
});
app.listen(3000, () => {
    console.log("i runs");
});

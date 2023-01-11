import  express,{Express,Request,response,Response}  from "express";
import multer,{Multer} from "multer";
import path, { dirname } from "path";
import PDFMerger from "pdf-merger-js";
const pdfmerger = new PDFMerger()

let storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  })
const mult = multer({storage:storage})
const app:Express = express()
app.use('/merger',express.static('merger'))
app.get('/',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})
app.post('/',mult.array('pdfs',2),async(req:Request,res:Response)=>{
   
 if(req.files && Array.isArray(req.files)){
    console.log(req.files[0].path)
   
   await pdfmerger.add('uploads/'+req.files[0].filename)
    await pdfmerger.add('uploads/'+req.files[1].filename)
    await pdfmerger.save('merger/merged.pdf')
    return res.redirect('/merger/merged.pdf')
 }
return res.json({"error":"no files"});
})
    
     
app.listen(3000,()=>{
    console.log("i runs")
})


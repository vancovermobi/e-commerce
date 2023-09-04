import multiparty from 'multiparty'
// import { connectToDB } from "../../../utils/database";
import formidable from "formidable";
import { IncomingForm, File } from "formidable";
import path from "path";
import { extname, join } from "path";
import fs from "fs/promises";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";

export const api = { bodyParser: false }

const pathDist =  path.join(process.cwd(), "/public/images");

function sanitizeFilename(filename){
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}


export async function POST(request , res) {

  const formData = await request.formData();

  const file = formData.get("file")

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const pathDist = join(process.cwd(), "/public/images");
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(pathDist, relativeUploadDir);


  try {
    await stat(uploadDir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );

    }
  }

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    console.log('filename : ' + filename);
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const finalFilePath = 'http://localhost:3000/images/' + `${relativeUploadDir}/${filename}`;
    return NextResponse.json({ done: "ok", filename: filename, httpfilepath: finalFilePath }, { status: 200 });

  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}




// ======Version - 01 =================
// const readFile = ( req, saveLocally) => {
//   console.log('======req==========:', req);

//   const options = {};
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "/public/images");
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + "_" + path.originalFilename;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;
//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//     console.log('=========files.file=========:', files.file);
//   });  
// };
// export const POST = async (req, res) => {
//     // const formData = await req.formData();
//     // const file = formData.get('file');
//     // console.log("======api/form data======", formData, file); 

//   try {
//     await fs.readdir(path.join(process.cwd() + "/public", "/images"));
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
//   }

//   await readFile(req, true);
//   res.json({ done: "ok" });

// };

// ======Version - 02 =================
// const handler = async (req, res) => {  
//   // const formData = await req.formData();
//   // const file = formData.get('file');
//   // const body = Object.fromEntries(formData);
//   // console.log("========form data===========", formData);
//   // console.log("========file data===========", file);
//   // console.log("========req body===========", body);

//   // try {
//   //   await fs.readdir(pathDist);
//   // } catch (error) {
//   //   await fs.mkdir(pathDist);
//   // }

//     //const form = new multiparty.Form()
//     // const form = new formidable({ multiples: true });
//     // const form = new IncomingForm() 
    
//     // const { fields, files } = await new Promise((resolve,reject) => {
//     //     form.parse(req, (err, fields, files) => {
//     //         if (err) return reject(err);
//     //         resolve({fields,files});      
//     //         });
//     // });
//     // console.log('=====files.file=====', files.file);
//     // return new Response(JSON.stringify("Liem"), {status: 200})
    
//     // =================================
//     try {
//       await fs.readdir(pathDist);
//     } catch (error) {
//       await fs.mkdir(pathDist);
//     }
  
//     try{
  
//       const { fields, files } = await readFile(req, true);
  
//       const firstFile = (files).file[0];
//       const size = firstFile.size;
//       const filepath = firstFile.filepath;
//       const newFilename = firstFile.newFilename;
//       const mimetype = firstFile.mimetype;
//       const mtime = firstFile.mtime;
//       const originalFilename = firstFile.originalFilename;
      
//       console.log(size);
//       console.log(filepath);
//       console.log(newFilename);
//       console.log(mimetype);
//       console.log(mtime);
//       console.log(originalFilename);
//       const finalFilePath = 'http://localhost:3000/images/' + newFilename;
  
//     return await res.status(200).json({ done: "ok" , filename: newFilename, httpfilepath: finalFilePath});
//   }
//   catch(error){
  
//     return await res.status(500).json({ done: "not" , filename: '', httpfilepath: ''});
//     }
//   };
  
// export default handler;

// const readFile = (req, saveLocally) => {
//   const options = {};
//   if (saveLocally) {
//     options.uploadDir = pathDist;
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + "_" + path.originalFilename;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;
//   options.keepExtensions = true;

//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// ======Version - 03 =================

// export async function POST(req, res) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const body = Object.fromEntries(formData);
//   console.log("========form data===========", formData);
//   console.log("========file data===========", file);
//   console.log("========req body===========", body);

//   const token = true 

//   if (token) {
//     const data = await new Promise((resolve, reject) => {
//       const form = new IncomingForm({ multiples: true })
//       form.parse(req, (err, fields, files) => {
//         if (err) return reject(err)
//         resolve({ fields, files })
//       })
//     })

//     const { fields } = data

//     console.log(fields)

//     if (fields.approved_flag === 'true') {
//       NextResponse.json({ message: 'Ok' })
//     } else {
//       NextResponse.json({ message: 'You have to confirm first' }, { status: 400 })
//     }
//   } else {
//     return NextResponse.json({ message: 'Token not valid or expired' }, { status: 400 })
//   }
// }

// export const GET = async (req, res) => {
//     try {
//         return new Response(JSON.stringify({res:"Liem"}), {status: 200})
//     } catch (error) {
//         return new Response('Failed to fetch all products', { status: 500 })
//     }
// }


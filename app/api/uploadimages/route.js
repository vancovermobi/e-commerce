import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "../../../utils/database";
import formidable from "formidable";
import { IncomingForm, File } from "formidable";
import path from "path";
import { extname, join } from "path";
import fs from "fs/promises";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";

export const api = { bodyParser: false }

// =========================================
const pathDist =  path.join(process.cwd(), "/public/images");

function sanitizeFilename(filename){
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request , res) {  

  const formData = await request.formData();

  const file = formData.get("file")

  if (!file) {
    return new Response(JSON.stringify(
      { error: "File blob is required." }),
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

// ==========================================

// const readFile = ( req, saveLocally) => {
// //  console.log('======req==========:', req);
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
//     const formData = await req.formData();
//     const file = formData.get('file');
//     console.log("======api/form data======", formData, file); 

//   try {
//     await fs.readdir(path.join(process.cwd() + "/public", "/images"));
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
//   }

//   await readFile(req, true);
//   res.json({ done: "ok" });

// };


// ========================================

// export const POST = async (req, res) => {   
//     // const form = new multiparty.Form()
//     const form = new formidable();
    
//     const { fields, files } = await new Promise((resolve,reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             resolve({fields,files});      
//             });
//     });
//     console.log('files.file:', files.file);
//     return res.json('ok')        
    
// }

// ================================
// export const GET = async (req) => {
//     try {
//         return new Response(JSON.stringify("Liem"), {status: 200})
//     } catch (error) {
//         return new Response('Failed to fetch all products', { status: 500 })
//     }
// }

// ========================================
// export default async function handle( req, res ) {
//   const {method} = req;
//   console.log('method:', method);

//   if (method === 'POST') {    
//     const form = new multiparty.Form()

//     const {fields,files} = await new Promise((resolve,reject) => {
//         form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({fields,files});      
//         });
//     });
//     console.log('files.length:', files.file.length);
//     res.json('ok')
//     }
// }


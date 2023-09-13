import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "../../../utils/database";
// import formidable from "formidable";
// import { IncomingForm, File } from "formidable";
import path from "path";
import { extname, join } from "path";
// import fs from "fs";
import { stat, mkdir, writeFile, readFileSync } from "fs/promises";
import * as dateFn from "date-fns";
import { S3Client, PutObjectCommand  } from '@aws-sdk/client-s3'
import mine from 'mime-types'
import sharp from "sharp";
// import { v4 as uuid } from "uuid";

export const api = { bodyParser: false }

// =========================================
const pathDist =  path.join(process.cwd(), "/public/images");
const bucketName = "liem-nextjs-ecommerce"

//==== S3Client-AWS-Amazon-S3_vancovermobi@gmail.com=======
const s3Client = new S3Client({
  region      : 'ap-southeast-1',
  credentials : {
    accessKeyId     : process.env.S3_ACCESS_KEY,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
  },
})
// Upload image to S3
async function uploadImageToS3(file, fileName){
  // Specify your desired width or height for resizing
  const resizedImageBuffer = await sharp(file)
    .resize(400, 500) 
    .toBuffer();

  const params = {    
    Bucket  : bucketName,
    Key     : fileName,
    Body    : file, //or resizedImageBuffer
    ACL     : 'public-read',
    ContentType: mine.lookup(file)
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
} 
// =================END========================

function sanitizeFilename(filename){
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

async function createPathDir() {
  const pathDist = join(process.cwd(), "/public/images");
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(pathDist, relativeUploadDir);
    //=> "D:\CODER PRO\NEXT_JS\e-commerce\public\images\04-09-2023"
  
  // Tạo đường dẫn folder local lưu file
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

  return { uploadDir: uploadDir , relativeUploadDir: relativeUploadDir }
}

async function createFileUpload(file) {

  const fileBuffer = Buffer.from(await file.arrayBuffer()); 

  const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
  const fileExtension = extname(file.name);  // jpg, png,webp,...
  const originalFilename = file.name.replace(/\.[^/.]+$/, "");
  //  => cat, dog,...
  const sanitizedFilename = sanitizeFilename(originalFilename);  
  const fileName = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
  //console.log('filename : ' + filename);

  return { fileName: fileName , fileBuffer: fileBuffer } 
}

export async function POST(request , res) {  

  const formData = await request.formData();
  // const files = formData.get("file")
  const files = formData.getAll("file")
  //console.log(`======formData.get"file"======`, formData);

  if (!files) {
    return new Response(JSON.stringify(
      { error: "File blob is required." }),
      { status: 400 }
    );
  }
  // Tạo đường dẫn Folder Local lưu file
  const { uploadDir, relativeUploadDir } = await createPathDir()

   // create reponse
  const fileNames = []
  const finalFilePaths = []
  const links = []

  for (const file of files) {    
    const { fileName, fileBuffer } = await createFileUpload(file)
   
    try {    
      // Ghi file vào Folder Local
      await writeFile(`${uploadDir}/${fileName}`, fileBuffer);

      // tạo đường dẫn hiển thị file localhost
      const finalFilePath = 'http://localhost:3000/images/' + `${relativeUploadDir}/${fileName}`;         
      
      // upload image to S3
      await uploadImageToS3(
        fileBuffer,
        fileName
      );   

      const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
      
      fileNames.push(fileName);
      finalFilePaths.push(finalFilePath);
      links.push(link);

    } catch (e) {
      console.error("Error while trying to upload bucket-aws-S3 a file\n", e);
      return NextResponse.json(
        { error: `Something went wrong: ${e.message}` },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.json({
    done            :"ok", 
    fileNames       :fileNames, 
    finalFilePaths  :finalFilePaths, 
    links           :links }, 
    { status: 200 }
  );
}


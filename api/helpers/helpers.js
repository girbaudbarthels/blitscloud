import util from 'util'
import gc from '../config/index.js'
const bucket = gc.bucket('blitscloud') // should be your bucket name

//Function that will upload the image to the bucket
const uploadFile = (file, uid) => new Promise((resolve, reject) => {
    //import name and buffer from the file
    const { originalname, buffer } = file
    //format the filename
    const newFileName = originalname.replace(/ /g, "_");
    //assign the file to the users unique id directory (firebase UID)
    const blob = bucket.file(`${uid}/${newFileName}`)
    //Start uploading the file
    const blobStream = blob.createWriteStream({
        resumable: false
    })

    //Listen to the stream
    blobStream.on('finish', () => {
        //Format the public url
        const publicUrl =
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        //Put the data of the file in an object that can be returned to our FE
        const data = {
            name: `${uid}/${newFileName}`,
            metadata: {
                timeCreated: Date(),
                size: file.size
            } 
        }

        resolve(data)
    })
        .on('error', (e) => {
            //Something went wrong
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})

//get all files from a user
async function getFiles(uid) {
    //Get the files
    const [files, queryForPage2] = await bucket.getFiles({ autoPaginate: false, prefix: uid});
    return files;
}

//download a specific file
async function downloadFile(fileName) {
    //Get the file
    const file = await bucket.file(`${fileName}`).download()
    return file[0];

}

//remove a specific file
async function removeFile(fileName) {
    //Delete the file
    const file = await bucket.file(`${fileName}`).delete()

    return file[0];
}

export  { uploadFile, getFiles, downloadFile, removeFile }

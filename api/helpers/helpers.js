import util from 'util'
import gc from '../config/index.js'
const bucket = gc.bucket('blitscloud') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file, uid) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    const newFileName = originalname.replace(/ /g, "_");
    const blob = bucket.file(`${uid}/${newFileName}`)

    const blobStream = blob.createWriteStream({
        resumable: false
    })


    blobStream.on('finish', () => {
        console.log('3')

        const publicUrl =
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`

        resolve(publicUrl)
        console.log(publicUrl)
    })
        .on('error', (e) => {
            console.log(e)
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})

export default uploadImage
import express from 'express'
import bodyParser from 'body-parser'
import multer  from 'multer'

import * as helper from '../api/helpers/helpers.js'

//Init express
const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
})

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//upload a file to the cloud storage bukkit
app.post('/upload-file', async (req, res, next) => {
  try {
    //The file
    const myFile = req.file
    //The UID of the user
    const uid = req.body.uid
    //Start uploading the image
    const imageUrl = await helper.uploadFile(myFile, uid)
    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    res
    .status(500)
    .json({
      message: `Error: ${error}`,
    })
    next(error)
  }
})

//get all files of a user
app.post('/get-files', async (req, res, next) => {
  try {
    //The uid of the user
    const uid = req.body.uid
    //Call the getfiles helper function
    const files = await helper.getFiles(uid);
    res
    .status(200)
    .json({
      message: "Upload was successful",
      data: files
    })
  } catch (error) {
    res
    .status(500)
    .json({
      message: `Error: ${error}`,
    })
    next(error)
  }
})

//Download a file
app.post('/download-file', async (req, res, next) => {
  try {
    //filename
    const fileName = req.body.fileName
    //The uid of the user
    const uid = req.body.uid
    //Call the getfiles helper function
    const file = await helper.downloadFile(fileName, uid);
    res
    .status(200)
    .json({
      message: "Download was successful",
      data: file
    })
  } catch (error) {
    res
    .status(500)
    .json({
      message: `Error: ${error}`,
    })
    next(error)
  }
})


app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

//Start listening on port 5000
app.listen(5000, () => {
})

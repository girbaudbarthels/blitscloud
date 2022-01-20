import express from 'express'
import bodyParser from 'body-parser'
import multer  from 'multer'

import uploadImage from '../api/helpers/helpers.js'

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

app.post('/uploads', async (req, res, next) => {
  try {

    const myFile = req.file
    const uid = req.body.uid
    console.log(myFile)
    const imageUrl = await uploadImage(myFile, uid)
    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    console.log(error)
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

app.listen(5000, () => {
  console.log('app now listening for requests!!!')
})

app.get('/test', (req, res) => {
  
  res.status(200).send("test succes")

})
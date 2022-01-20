import Cloud from '@google-cloud/storage'
import path from 'path'
const __dirname = path.resolve();

const serviceKey = path.join(__dirname, './keys.json')

//Initialize storage connection
const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'blitscloud-9dd5b',
})

export default storage
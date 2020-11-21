import path from 'path'

import { Router, Request, Response } from 'express'
import multer from 'multer'

const router: Router = Router()

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

/**
 * Checks if a file is suitable for upload
 * @param file The file to consider
 * @param cb Return to multer middleware
 */
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) return cb(null, true)
  else return cb(new Error('Images Only'))
}

const upload = multer({
  storage,
  fileFilter: function (req: Request, file, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  res.send(`/${req.file.path}`)
})

export default router

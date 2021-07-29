//@ts-check
import { db } from '../../lib/db'

const handler = async (req, res) => {
  const {no_klasifikasi} = req.query
    try {
      const results = await db.query(`
      SELECT * FROM tb_klasifikasi_buku
      WHERE no_klasifikasi = ?
    `, [no_klasifikasi]);
      await db.end
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
//@ts-check
import { db } from '../../lib/db'

const handler = async (req, res) => {
  const {index_buku} = req.query
    try {
      const results = await db.query(`
      SELECT * FROM tb_buku
      WHERE index_buku = ?
    `, [index_buku]);
      await db.end
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
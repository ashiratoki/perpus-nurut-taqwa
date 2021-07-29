//@ts-check
import { db } from '../../lib/db'

const handler = async (req, res) => {
  const {nis} = req.query
    try {
      const results = await db.query(`
      SELECT * FROM tb_siswa 
      WHERE nis = ?
    `, [nis]);
      await db.end
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler

  // SELECT * FROM tb_siswa
  //       LIMIT 10
import { db } from '../../lib/db'

const handler = async (req, res) => {
  const {tahun} = req.query
    try {
      const results = await db.query(`
      SELECT MONTHNAME(tgl_pinjam), COUNT(*) 
      FROM tb_transaksi 
      WHERE YEAR(tgl_pinjam)=? 
      GROUP BY MONTHNAME(tgl_pinjam);
    `, [tahun]);
      await db.end
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
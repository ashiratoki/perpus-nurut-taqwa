//@ts-check
import { db } from '../../lib/db'

const handler = async (req, res) => {
  const {nis} = req.query
    try {
      const results = await db.query(`
      SELECT tb_transaksi.*,tb_buku.*, tb_klasifikasi_buku.* 
      FROM tb_transaksi JOIN tb_buku ON tb_transaksi.index_buku = tb_buku.index_buku JOIN tb_klasifikasi_buku 
      ON tb_buku.no_klasifikasi = tb_klasifikasi_buku.no_klasifikasi 
      WHERE tb_transaksi.nis = ?
      ORDER BY tb_transaksi.tgl_pinjam DESC
    `, [nis]);
      await db.end
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
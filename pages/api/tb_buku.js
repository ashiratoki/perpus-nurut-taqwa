import { query } from '../../lib/db'

const handler = async (_, res) => {
    try {
      const results = await query(`
      SELECT tb_buku.*,tb_klasifikasi_buku.*,DATE_FORMAT(tb_buku.tgl_masuk, '%Y-%m-%d') AS tgl_masuk_fix 
      FROM tb_buku LEFT OUTER JOIN tb_klasifikasi_buku 
      ON tb_buku.no_klasifikasi=tb_klasifikasi_buku.no_klasifikasi
      ORDER BY tb_buku.id_buku ASC
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler

  // SELECT * FROM tb_buku
  //       LIMIT 10
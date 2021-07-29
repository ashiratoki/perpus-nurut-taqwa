import { query } from '../../lib/db'

const handler = async (_, res) => {
    try {
      const results = await query(`
        SELECT * FROM tb_klasifikasi_buku WHERE tb_klasifikasi_buku.stok > tb_klasifikasi_buku.tersedia ORDER BY id ASC;
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
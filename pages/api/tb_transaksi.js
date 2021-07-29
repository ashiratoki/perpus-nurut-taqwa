import { query } from '../../lib/db'

const handler = async (_, res) => {
    try {
      const results = await query(`
      SELECT *,
      DATE_FORMAT(tb_transaksi.tgl_pinjam, '%Y-%m-%d') AS tgl_pinjam_fix,
      DATE_FORMAT(tb_transaksi.tgl_tempo, '%Y-%m-%d') AS tgl_tempo_fix  
      FROM tb_transaksi
      LEFT OUTER JOIN tb_siswa ON tb_transaksi.nis=tb_siswa.nis
      LEFT OUTER JOIN tb_buku ON tb_transaksi.index_buku=tb_buku.index_buku
      ORDER BY tb_transaksi.id_transaksi ASC
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
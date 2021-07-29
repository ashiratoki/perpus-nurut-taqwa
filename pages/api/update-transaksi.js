//@ts-check
import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { nis, index_buku, tgl_pinjam, tgl_tempo, tgl_kembali, id_transaksi } = req.body
  try {
    if  (!nis ||!index_buku || !tgl_pinjam || !tgl_tempo || !tgl_kembali || !id_transaksi) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `UPDATE tb_transaksi 
      SET nis = ?, index_buku = ? , 
      tgl_pinjam = ? ,tgl_tempo = ? ,tgl_kembali = ? 
      WHERE id_transaksi = ?`, [nis, index_buku, tgl_pinjam, tgl_tempo, tgl_kembali, id_transaksi]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

//@ts-check
import { query } from '../../lib/db'



const handler = async (req, res) => {
  const { nis, index_buku, no_klasifikasi, tgl_pinjam, tgl_tempo, tgl_kembali } = req.body
  try {
    if  (!nis ||!index_buku || !no_klasifikasi || !tgl_pinjam || !tgl_tempo || !tgl_kembali) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_transaksi (nis, index_buku, no_klasifikasi, tgl_pinjam, tgl_tempo, tgl_kembali)
      VALUES (?,?,?,?,?,?)`,[nis, index_buku, no_klasifikasi, tgl_pinjam, tgl_tempo, tgl_kembali]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

//@ts-check
import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { index_buku, no_klasifikasi, status, tgl_masuk, id_buku } = req.body
  try {
    if  (!index_buku || !no_klasifikasi || !status || !tgl_masuk || !id_buku) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `UPDATE tb_buku 
      SET index_buku = ?, no_klasifikasi = ? , status = ?,
      tgl_masuk = ? 
      WHERE id_buku = ?`, [index_buku, no_klasifikasi, status, tgl_masuk, id_buku]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

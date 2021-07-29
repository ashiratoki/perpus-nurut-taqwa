//@ts-check
import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris, id } = req.body
  try {
    if  (!no_klasifikasi || !judul || !pengarang || !penerbit || !tahun_terbit || !stok || !tersedia || !gambar || !rak || !baris || !id) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `UPDATE tb_klasifikasi_buku 
      SET no_klasifikasi = ?, judul = ?, pengarang = ?, penerbit = ?, tahun_terbit = ?,
      stok = ?, tersedia = ?, gambar = ?, rak = ?, baris = ?
      WHERE id = ?`, [no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris, id]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

//@ts-check
import { query } from '../../lib/db'



const handler = async (req, res) => {
  const { no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris } = req.body
  try {
    if  (!no_klasifikasi || !judul || !pengarang || !penerbit || !tahun_terbit || !stok || !tersedia || !gambar || !rak || !baris) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_klasifikasi_buku (no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,[no_klasifikasi, judul, pengarang, penerbit, tahun_terbit, stok, tersedia, gambar, rak, baris]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

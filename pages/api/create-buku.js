//@ts-check
import { query } from '../../lib/db'



const handler = async (req, res) => {
  const { index_buku, no_klasifikasi, status, tgl_masuk } = req.body
  try {
    if  (!index_buku || !no_klasifikasi || !status || !tgl_masuk) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_buku (index_buku, no_klasifikasi, status, tgl_masuk)
      VALUES (?,?,?,?)`,[index_buku, no_klasifikasi, status, tgl_masuk]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

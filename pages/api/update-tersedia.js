//@ts-check
import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { no_klasifikasi } = req.body
  try {
    if  (!no_klasifikasi ) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `UPDATE tb_klasifikasi_buku 
      SET tersedia = tersedia - 1
      WHERE no_klasifikasi = ?`, [no_klasifikasi]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

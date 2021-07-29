//@ts-check
import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { nis,index_buku,tgl_tempo,tgl_kembali,denda, status} = req.body
  try {
    if  (!nis ||!index_buku ||!tgl_tempo||!tgl_kembali ||!denda || !status) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_denda (nis,index_buku,tgl_tempo,tgl_kembali,denda,status)
      VALUES (?,?,?,?,?,?)`,[nis,index_buku,tgl_tempo,tgl_kembali,denda,status]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

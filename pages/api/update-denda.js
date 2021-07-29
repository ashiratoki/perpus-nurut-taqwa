//@ts-check

import { query } from '../../lib/db'

const handler = async (req, res) => {
    const { nis,index_buku,tgl_tempo,tgl_kembali,denda,status,id} = req.body
    try {
        if  (!nis ||!index_buku ||!tgl_tempo || !tgl_kembali ||!denda ||!status||!id) {
            return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      UPDATE tb_denda
      SET  nis = ?,index_buku = ?,tgl_tempo = ?, tgl_kembali= ?, denda = ?, status = ?
      WHERE id = ?`, [nis,index_buku,tgl_tempo,tgl_kembali,denda,status,id]
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
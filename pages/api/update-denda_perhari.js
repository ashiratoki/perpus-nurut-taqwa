//@ts-check

import { query } from '../../lib/db'



const handler = async (req, res) => {
    const { denda_perhari, id} = req.body
    try {
        if  ( !denda_perhari || !id) {
            return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      UPDATE tb_dendaperhari
      SET denda_perhari = ?
      WHERE id = ?`, [denda_perhari,id]
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

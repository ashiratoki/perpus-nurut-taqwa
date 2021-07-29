//@ts-check
import { query } from '../../lib/db'



const handler = async (req, res) => {
  const { nis,username,password} = req.body
  try {
    if  (!nis ||!username ||!password ) {
      return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_user (nis,username,password)
      VALUES (?,?,?)`,[nis,username,password]
    );
    // await query.end;

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

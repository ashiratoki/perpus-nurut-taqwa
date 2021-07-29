//@ts-check
import { query } from '../../lib/db'



const handler = async (req, user) => {
  const { nis, username, password } = req.body
  try {
    if  (!nis|| !username || !password ) {
      return user
        .status(400)
        .json({ message: 'Input User harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_user (nis, username, password, role)
      VALUES ( ?, ? , ?, 'siswa'); 
      `,[nis, username, password]
    );
    // await query.end;

    return user.json(results)
  } catch (e) {
    user.status(500).json({ message: e.message })
  }
}

export default handler

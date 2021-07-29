import { query } from '../../lib/db'

const handler = async (_, res) => {
    try {
      const results = await query(`
      SELECT * FROM tb_siswa INNER JOIN tb_user ON tb_siswa.nis=tb_user.nis
      WHERE tb_user.role = 'siswa' AND YEAR(NOW()) - angkatan >= 3
      ORDER BY tb_siswa.id ASC
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler

  // SELECT * FROM tb_siswa
  //       LIMIT 10
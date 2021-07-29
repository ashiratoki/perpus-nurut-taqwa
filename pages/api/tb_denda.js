import { query } from '../../lib/db'

const handler = async (_, res) => {
    try {
      const results = await query(`
      SELECT tb_denda.*, tb_siswa.*, tb_denda.id AS id_denda,
      DATE_FORMAT(tb_denda.tgl_tempo, '%Y-%m-%d') AS tgl_tempo_fix,
      DATE_FORMAT(tb_denda.tgl_kembali, '%Y-%m-%d') AS tgl_kembali_fix 
      FROM tb_denda INNER JOIN tb_siswa ON tb_denda.nis=tb_siswa.nis 
      ORDER BY tb_denda.id ASC;
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler


      // SELECT * FROM tb_denda
      //   ORDER BY id ASC
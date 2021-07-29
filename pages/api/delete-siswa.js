import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(400).json({ message: '`nis` required' })
    }
    if (typeof parseInt(id.toString()) !== 'number') {
      return res.status(400).json({ message: '`nis` must be a number' })
    }
    const results = await query(
      `
      DELETE FROM tb_siswa
      WHERE nis = ?
  `,
      id
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
// DELETE tb_siswa, tb_user
//         FROM tb_siswa LEFT OUTER JOIN tb_user ON tb_siswa.nis=tb_user.nis
//         WHERE tb_siswa.nis = ?
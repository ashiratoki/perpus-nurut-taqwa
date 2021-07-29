import { query } from '../../lib/db'

const handler = async (req, res) => {
  const { id_buku } = req.query
  try {
    if (!id_buku) {
      return res.status(400).json({ message: '`id_buku` required' })
    }
    if (typeof parseInt(id_buku.toString()) !== 'number') {
      return res.status(400).json({ message: '`id_buku` must be a number' })
    }
    const results = await query(
      `
      DELETE FROM tb_buku
      WHERE id_buku = ?
  `,
      id_buku
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

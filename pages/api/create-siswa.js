//@ts-check
import { query } from '../../lib/db'



const handler = async (req, siswa) => {
  const { nis, nama, no_telp, jenis_kelamin, jurusan, angkatan} = req.body
  try {
    if  (!nis ||!nama ||!no_telp ||!jenis_kelamin ||!jurusan || !angkatan) {
      return siswa
        .status(400)
        .json({ message: 'Input Siswa harus di isi semua' })
    }

    const results = await query(
      `
      INSERT INTO tb_siswa (nis, nama, no_telp, jenis_kelamin, jurusan, angkatan)
      VALUES (?,?,?,?,?,?)`,[nis, nama, no_telp, jenis_kelamin, jurusan, angkatan]
    );
    // await query.end;

    return siswa.json(results)
  } catch (e) {
    siswa.status(500).json({ message: e.message })
  }
}

export default handler

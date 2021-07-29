//@ts-check

import { query } from '../../lib/db'



const handler = async (req, res) => {
    const { nis,nama,no_telp,jenis_kelamin,jurusan,angkatan,username,password, nisLama} = req.body
    try {
        if  (!nis ||!nama ||!no_telp ||!jenis_kelamin ||!jurusan
            ||!angkatan||!username ||!password || !nisLama) {
            return res
        .status(400)
        .json({ message: 'input harus di isi semua' })
    }

    const results = await query(
      `
      UPDATE tb_siswa
      INNER JOIN tb_user ON tb_siswa.nis = tb_user.nis
      SET  tb_siswa.nis = ?, tb_siswa.nama = ?, tb_siswa.no_telp = ?, tb_siswa.jenis_kelamin = ?, tb_siswa.jurusan = ?
      , tb_siswa.angkatan = ? , tb_user.username = ? , tb_user.password = ?
      WHERE tb_siswa.nis = ?`, [nis,nama,no_telp,jenis_kelamin,jurusan,angkatan,username,password,nisLama]
    );
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

// UPDATE tb_siswa
//       SET  nis = ?, nama = ?, no_telp = ?, jenis_kelamin = ?, jurusan = ?
//       , angkatan = ? , username = ? , password = ?
//       WHERE nis = ?`, [nis,nama,no_telp,jenis_kelamin,jurusan,angkatan,username,password,nisLama]
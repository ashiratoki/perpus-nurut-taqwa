import { query } from '../../lib/db'

const handler = async (req, res) => {
    try {
      const { username, password } = req.body;
      const results = await query(`
      SELECT u.role, u.id_user, u.nis, u.username, u.password, s.nama, s.jurusan, s.no_telp FROM tb_user u LEFT JOIN tb_siswa s ON u.nis = s.nis WHERE u.username = "${username}"
        `
        );
      if (results.length === 0) {
        return res.status(203).json({auth : false, status : "Failed", message : "Username not registered"})
      }

      const user = results[0];
      if (user.password !== password) {
        return res.status(203).json({auth : false, status : "Failed", message : "Password Salah"})
      }
      return res.status(200).json({auth : true, status : "Success",data : user})
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  
  export default handler
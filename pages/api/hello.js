// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => 
{
  res.status(200).json
  (
    {dataDenda:
      [
        { no:'1', id_siswa:'s01', id_buku:'b01', tgl_terlambat:'20-01-2021',denda:'2500'},
        { no:'2', id_siswa:'s02', id_buku:'b02', tgl_terlambat:'21-01-2021',denda:'2600'},
        { no:'3', id_siswa:'s03', id_buku:'b03', tgl_terlambat:'22-01-2021',denda:'2700'},
        { no:'4', id_siswa:'s04', id_buku:'b04', tgl_terlambat:'23-01-2021',denda:'2800'}
      ]
    }
    
  )
}

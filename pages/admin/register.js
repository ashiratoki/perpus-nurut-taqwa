//@ts-check
import { useState } from 'react'
import Link from 'next/link'
export default function Register() {
  const [nis, setNis] = useState('')
  const [nama, setNama] = useState('')
  const [no_telp, setNotelp] = useState('')
  const [jenis_kelamin, setKelamin] = useState('')
  const [jurusan, setJurusan] = useState('')
  const [angkatan, setAngkatan] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPass] = useState('')
  const clearInput = () => {
    setNama('')
    setNotelp('')
    setKelamin('')
    setJurusan('')
    setAngkatan('')
  }

  const setAll = (value) => {
    setNis(value);
    setPass(value);
    setUsername(value);
  }
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  // async function nisDetection(value){
  //   const data = await fetch(`${http}://${host}/api/nis?nis=${value}`)
  //   const hasil = await data.json()
  //   console.log(hasil)
  //   if(hasil.length < 1){
  //       setNis(value);
  //       setPass(value);
  //       setUsername(value);
  //   }else{
  //       alert(`NIM dengan angka ${value} sudah terdaftar`)
  //       setNis('')
  //       setPass('')
  //       setUsername('')
  //   }
  // }

  async function submitHandlerSiswa(e) {
    e.preventDefault()
    try {
      e.preventDefault()
      const siswa = await fetch(`${http}://${host}/api/create-siswa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis, nama, no_telp, jenis_kelamin, jurusan, angkatan
        }),
      })
      const json = await siswa.json()
      if (!siswa.ok) throw Error(json.message)
      e.preventDefault()
      alert("Penambahan Data Siswa Sukses")
      alert("Mohon untuk Tekan tombol Register User untuk mendaftarkan Username dan Password")
      clearInput()
      
    } catch (e) {
      throw Error(e.message)
    }
  }
  async function submitHandlerUser(e) {
    e.preventDefault()
    try {
      e.preventDefault()
      const user = await fetch(`${http}://${host}/api/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nis, username, password
        }),
      })
      const json = await user.json()
      if (!user.ok) throw Error(json.message)
      alert("Penambahan Data User Sukses")
      e.preventDefault()
      clearInput();
      setNis('')
      setUsername('')
      setPass('')
      
    } catch (e) {
      throw Error(e.message)
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    submitHandlerUser(e);
  }

  //Darul Anwar
  // const checkNisFormat = (value) => {
  //   let arrNis = value.split('')
  //   if(arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.'){
  //     setAll(value)
  //   }
  //   else{
  //     setAll(value)
  //     alert('Format Nim Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/111.111')
  //   } 
  // }

  //Nurut Taqwa
  // const checkNisFormat = (value) => {
  //   let arrNis = value.split('')
  //   if(arrNis.length == 13 && arrNis[4] == '/' && arrNis[9] == '.'){
  //     setAll(value)
  //   }
  //   else{
  //     setAll(value)
  //     alert('Format Nim Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/1111.111')
  //   } 
  // }

  //Darul Anwar
   async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if(arrNis.length == 12 && arrNis[4] == '/' && arrNis[8] == '.'){
      setNis(nis)
      if (hasil.length >= 1) {
        alert.innerHTML = (`${nis} sudah terdaftar`)
        setNis('')
      }else{
        setNis(nis)
        alert.innerHTML=''
      }
    }
    else{
      setNis(nis)
      alert.innerHTML = ('Format NIS Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/111.111')
    } 
  }

  // Nurut Taqwa
  async function checkNis(nis) {
    let arrNis = nis.split('')
    const data = await fetch(`${http}://${host}/api/nis?nis=${nis}`)
    const hasil = await data.json()
    let alert = document.getElementById('checkErrorNis')
    console.log(hasil)
    if (arrNis.length == 13 && arrNis[4] == '/' && arrNis[9] == '.') {
      setNis(nis)
      if (hasil.length >= 1) {
        alert.innerHTML = (`${nis} sudah terdaftar`)
        setNis('')
      } else {
        setNis(nis)
        alert.innerHTML=''
      }
    }
    else {
      setNis(nis)
      alert.innerHTML = ('Format NIS Salah, Mohon untuk diperbaiki, Contoh Penulisan : 1111/1111.111')
    }
  }

  return (
    <div>
      <div className="container" style={{ width: 1048 }}>
        <div className="card shadow-lg o-hidden border-0 my-5" style={{ width: 571, margin: 'auto', marginLeft: 190 }}>
          <div className="card-body p-0" style={{ width: 944 }}>
            <div className="row" style={{ width: 1010 }}>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Register Siswa Anggota Perpustakaan</h4>
                  </div>
                  <form className="user" onSubmit={submitHandlerSiswa}>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text" id="nisSiswa"
                          name="nis"
                          placeholder="Nomor Induk Sekolah"
                          value={nis}
                          onChange={(e) => setAll(e.target.value)}
                          onBlur={(e) => checkNis(e.target.value)}
                          required />
                      </div>
                      <p id="checkErrorNis" style={{ color: 'red' }}></p>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text" id="namaSiswa"
                          placeholder="Nama Siswa"
                          name="nama"
                          style={{ width: 470 }}
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="text" id="noTelpSiswa"
                        placeholder="No Telp/WA"
                        name="noTelp"
                        style={{ width: 470 }}
                        value={no_telp}
                        onChange={(e) => setNotelp(e.target.value)}
                        required />
                    </div>
                    <div className="mb-3" >
                      <label htmlFor="" className="">Jenis Kelamin</label>
                      <select
                        name=""
                        id=""
                        className="form-select"
                        value={jenis_kelamin}
                        onChange={(e) => setKelamin(e.target.value)}
                        required>
                        <option></option>
                        <option value='Laki-laki'>Laki-laki</option>
                        <option value='Perempuan' >Perempuan</option>
                      </select>
                    </div>
                    <div className="mb-3" >
                      <label htmlFor="" className="">Jurusan</label>
                      <select
                        name=""
                        id=""
                        className="form-select"
                        value={jurusan}
                        onChange={(e) => setJurusan(e.target.value)}
                        required>
                        <option></option>
                        <option value='Akuntansi' >Akuntansi</option>
                        <option value='Teknik Komputer dan Jaringan'>Teknik Komputer dan Jaringan</option>
                        <option value='Teknik Kendaraan Ringan' >Teknik Kendaraan Ringan</option>
                        <option value='Teknik Sepeda Motor' >Teknik Sepeda Motor</option>
                      </select>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="angkatan"
                          placeholder="Angkatan"
                          name="angkatan"
                          value={angkatan}
                          style={{ width: 470 }}
                          onChange={(e) => setAngkatan(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary d-block btn-user w-100 mb-3" type="submit" style={{ fontSize: '20.8px' }}>Register Data Siswa</button>
                  </form>
                  <form className="user" onSubmit={submitHandlerUser}>
                      <div className=" mb-3">
                        <input
                          className="form-control form-control-user"
                          type="text" id="noTelpSiswa"
                          placeholder="Username"
                          name="noTelp"
                          style={{ width: 470 }}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="text" id="noTelpSiswa"
                          placeholder="Password"
                          name="noTelp"
                          style={{ width: 470 }}
                          value={password}
                          onChange={(e) => setPass(e.target.value)}
                          required />
                      </div>
                      <button className="btn btn-primary d-block btn-user w-100" type="submit" style={{ fontSize: '20.8px' }}>Register User</button>
                    </form>
                    <hr /><Link href="/admin/home" ><a className="btn btn-primary d-block btn-facebook btn-user w-100" role="button" style={{ fontSize: '18.8px' }}>Kembali</a></Link>
                    <hr />

                  <div className="text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
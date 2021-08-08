//@ts-check
import useSWR from 'swr'
import { mutate } from 'swr'
import { useState } from 'react'
import Moment from 'react-moment'

async function fetcher(url){
  const res = await fetch(url);
  return res.json();
}
export default function tableTransaksiTemp(){
  const [deleting, setDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'
  const url ='${http}://${host}/api/tb_transaksi_temporary';

  const {data,error} = useSWR(url,fetcher);

  if(error){
      return <div>error......</div>
  }
  if(!data){
      return <div>loading......</div>
  }
  console.log(data);

  async function deleteEntry(value) {
    setDeleting(true)
    let res = await fetch(`${http}://${host}/api/delete-transaksi-temporary?id=${value}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    alert("Data telah dihapus  "  )
    mutate('${http}://${host}/api/tb_transaksi_temporary')
    setDeleting(false)
  }

    return(
        <div className="table-responsive">
          <div className="row">
                <div className="col-md-6 text-nowrap">
                <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                        <option value={10} selected>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>&nbsp;</label></div>
                </div>
                <div className="col-md-6">
                <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label">
                    <input type="search" 
                    className="form-control form-control-sm" 
                    aria-controls="dataTable" placeholder="Search" 
                    onChange={event=>{setSearchTerm(event.target.value)}} /></label></div>
                </div>
            </div>
             <table className="table my-0" id="dataTable">
            <thead>
              <tr>
                <th style={{width: 'auto'}}>No</th>
                <th>NIS</th>
                <th>No Induk Buku</th>
                <th>No Klasifikasi</th>
                <th>Judul</th>
                <th>Tgl-Pinjam</th>
                <th>Tgl-Tempo</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
            {data.filter((tblDat)=>{
                        if(searchTerm==""){
                            return tblDat
                        }else if(tblDat.nis.toLowerCase().includes(searchTerm.toLowerCase())){
                            return tblDat
                        }else if(tblDat.index_buku.toLowerCase().includes(searchTerm.toLowerCase())){
                          return tblDat
                        }else if(tblDat.tgl_pinjam.toLowerCase().includes(searchTerm.toLowerCase())){
                          return tblDat
                        }else if(tblDat.tgl_tempo.toLowerCase().includes(searchTerm.toLowerCase())){
                          return tblDat
                        }
                        
                      }).map((tblDat,index)=>
              <tr key = {index}>
                <td>{index+1}</td>
                <td>{tblDat.nis}</td>
                <td>{tblDat.index_buku}</td>
                <td>{tblDat.no_klasifikasi}</td>
                <td>{tblDat.judul}</td>
                <td>{tblDat.tgl_pinjam}</td>
                <td>{tblDat.tgl_tempo}</td>
                <td><div className="btn-group-vertical btn-group-sm">
                <a href='/admin/update-transaksi-temp'><button type="button" className="btn btn-primary mb-2">Setujui</button></a> 
                  <button type="button" className="btn btn-secondary  mb-2">Update</button>
                  <button className="btn btn-primary" 
                    disabled={deleting} 
                    value = {tblDat.id}
                    onClick={e => deleteEntry(e.target.value)} 
                    type="button" 
                    style={{background: 'rgb(247,75,75)'}}
                    
                  >{deleting ? 'Hapus... ' : ' Hapus' }
                  </button>
                  </div>
                </td>
              </tr>
            )}
            </tbody>  
          </table>
        </div>
    )
}
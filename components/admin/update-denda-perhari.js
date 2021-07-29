//@ts-check
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
export default function updateDendahari(){
  const [_denda_perhari, setDendaperhari] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { denda_perhari,id } = router.query
  const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
  const http = host === 'localhost:3000' ? 'http' : 'https'

  useEffect(() => {
    if (typeof denda_perhari == 'string') {
      setDendaperhari(denda_perhari)
    }

  }, [ denda_perhari , id ])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${http}://${host}/api/update-denda_perhari`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          denda_perhari : _denda_perhari,
          id : id
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)

      alert("Update data suskses" + _denda_perhari)
      Router.push('/admin/data-denda')
    } catch (e) {
      throw Error(e.message)
    }
  }

    return(
 <div id="wrapper" style={{width: 1345}} >
  <div className="d-flex flex-column" id="content-wrapper">
    <div id="content">
    
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Update Data Denda Perhari</h3>
        <div className="row mb-3">
          <div className="col-lg-8">
            <div className="row">
              <div className="col" style={{width: '489.328px'}}>
                <div className="card shadow mb-3" style={{width: '516.328px'}}>
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Update Denda Perhari</p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Denda</strong>&nbsp;Perhari<br /></label>
                          <input 
                            className="form-control" 
                            type="text" id="denda_perhari" 
                            placeholder="denda perhari" 
                            name="username" 
                            value={_denda_perhari}
                            onChange={(e) => setDendaperhari(e.target.value)}
                            required
                          /></div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button className="btn btn-primary btn-sm" type="submit" style={{padding: '11px 8px', fontSize: 17, marginTop: 11}}>{submitting ? 'Saving ...' : 'Save'}</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
    )
}
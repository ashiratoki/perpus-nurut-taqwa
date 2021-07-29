//@ts-check
export default function showTable ({tableData}){
    return (

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">

        <table className="table my-0" id="dataTable">
          <thead>
            <tr>
              <th style={{width: 93}}>id_aktifitas</th>
              <th style={{width: 190}}>Tanggal</th>
              <th>Aktifitas</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tblDat,index)=>
              <tr key = {index} >
              <td>{tblDat.idAktifitas}</td>
              <td>{tblDat.tanggal}</td>
              <td>{tblDat.aktifitas}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    )

}
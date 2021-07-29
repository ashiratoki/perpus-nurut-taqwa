//@ts-check
export default function Profil(){
    return(
     <div>
  <div id="ubah-password">
    <div className="row register-form">
      <div className="col-md-8 offset-md-2">
        <form className="custom-form">
      <div>  <img className="border rounded-circle img-profile" src="assets/img/user8-128x128.jpg" style={{width: 100, height: 100}} /><label className="form-label" htmlFor="name-input-field" style={{marginTop: '-44px', paddingTop: 48, width: '121.8906px', height: 19, marginLeft: 60}}>Edit foto profil<input className="form-control" type="file" style={{width: '207.875px', fontSize: 14, marginLeft: '-52px', height: 30, textAlign: 'left', paddingLeft: 15}} /></label></div>
          <div className="row form-group" style={{paddingTop: 53}}>
         
          </div><button className="btn btn-light submit-button" type="button" style={{background: '#2E8B57', borderRadius: 68}}>Simpan Perubahan</button><a href="beranda-user.html"><button className="btn btn-light submit-button" type="button" style={{background: 'rgb(183,53,44)', margin: 1, borderRadius: 83}}>Kembali</button></a>
        </form>
      </div>
    </div>
  </div>
</div>

    )
}
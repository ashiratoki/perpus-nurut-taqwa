//@ts-check
export default function gantipas(){
    return(
        <div>   
        <div className="container-fluid">
        <h3 className="text-dark mb-4">Ganti Password Akun</h3>
        <div className="card shadow mb-3" style={{width: '516.328px'}}>
            <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">Isi form berikut untuk mengubah Password</p>
            </div>
            <div className="card-body">
            <form>
                <div className="row">
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Password Lama</strong><br /></label><input className="form-control" type="password" id="username-3" placeholder="Password Lama" name="username" /></div>
                </div>
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Konfirmasi Password Lama</strong><br /></label><input className="form-control" type="password" id="email-3" placeholder="Isi Lagi Password Lama" name="email" /></div>
                </div>
                </div>
                <div className="row">
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Password Baru</strong><br /></label><input className="form-control" type="password" id="username-1" placeholder="Password Baru" name="username" /></div>
                </div>
                <div className="col">
                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Konfirmasi Password Baru</strong><br /></label><input className="form-control" type="password" id="email-1" placeholder="Isi Lagi Password Baru" name="email" /></div>
                </div>
                </div>
                <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit" style={{padding: '11px 8px', fontSize: 17, marginTop: 11}}>Ubah Password</button></div>
            </form>
            </div>
        </div>
    </div>
 </div>   


    )
}
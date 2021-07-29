//@ts-check
import useSWR from 'swr'

export default function dashboard() {
    async function fetcher(url) {
        const res = await fetch(url);
        return res.json();
    }
    let year = new Date().getFullYear();
    console.log(year)
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' ? 'http' : 'https'
    const url = `${http}://${host}/api/tb_transaksi_count?tahun=${year}`;

    const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

    if (error) {
        return <div>error......</div>
    }
    if (!data) {
        return <div>loading......</div>
    }
    console.log(data);
    console.log(data.length);
    console.log(
        data.map((dat, index) => {
            return(
            <div className="col-md-6 col-xl-3 mb-4" >
                <div className="card shadow border-start-primary py-2">
                    <div className="card-body">
                        <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                                <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>{index + 1} {dat["MONTHNAME(tgl_pinjam)"]}</span></div>
                                <div className="text-dark fw-bold h5 mb-0"><span>{dat["COUNT(*)"]} Buku</span></div>
                            </div>
                            <div className="col-auto"><i className="fas fa-book fa-2x text-gray-300" /></div>
                        </div>
                    </div>
                </div>
            </div>
            )
            
        })
    )
    return (
        <>
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Dashboard Tahun {year}</h3>
            </div>
            <div className="row">
                {data.map((dat, index) => {
                    return(
                    <div className="col-md-6 col-xl-3 mb-4" >
                        <div className="card shadow border-start-primary py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>JUMLAH PEMINJAMAN BULAN {dat["MONTHNAME(tgl_pinjam)"]}</span></div>
                                        <div className="text-dark fw-bold h5 mb-0"><span>{dat["COUNT(*)"]} Buku</span></div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-book fa-2x text-gray-300" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </>
    )
}
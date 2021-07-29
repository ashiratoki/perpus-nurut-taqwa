//@ts-check
import useSWR from 'swr'

export default function dashboard() {
    async function fetcher(url) {
        const res = await fetch(url);
        return res.json();
    }
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' && typeof window !== 'undefined' && window.location.host ? 'http' : 'https'
    const url = `${http}://${host}/api/tb_denda_notifikasi`;
    const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });
    if (error) {
      return <div>error......</div>
    }
    if (!data) {
      return <div>loading......</div>
    }
    return(
        <>
        <p id="notifDenda">Jumlah Denda Rangkuman yang belum dikumpulkan : {data.length}</p>
        </>
    )
}
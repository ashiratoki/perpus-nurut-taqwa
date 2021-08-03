//@ts-check

import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import { mutate } from 'swr'
import Moment from 'react-moment'
import Link from 'next/link'



async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
}



export default function cardDetail() {
    const router = useRouter()
    const { id } = router.query
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' ? 'http' : 'https'
    const url = `${http}://${host}/api/tes?id=${id}`;

    const { data, error } = useSWR(url, fetcher);

    if (error) {
        return <div>error......</div>
    }
    if (!data) {
        return <div>loading......</div>
    }
    console.log(data);

    return (
        <div className="col">
            <div className="bs-callout bs-callout-success">
                <h4>Sukses!</h4>
                <p className="p-4 bg-primary text-white">Buku ini akan dipinjam<br /><strong>Mohon tunjukkan NIS dan No Index Buku ke Admin</strong></p>
                <h1>Judul Buku : {data[0].judul}</h1>
                <h1>No. Klasifikasi Buku : {data[0].no_klasifikasi}</h1>
                <p><strong>Buku dengan No Klasifikasi {data[0].no_klasifikasi} ada di rak {data[0].rak} baris ke- {data[0].baris}</strong></p>
                <Link href="/user/home"><button className="btn btn-primary mt-3 mb-3" type="button" style={{ fontSize: 17, background: 'rgb(210,42,32)' }}>Kembali</button></Link>
            </div>
        </div>
    )
}

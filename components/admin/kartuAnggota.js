//@ts-check
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function updateDenda() {
    const router = useRouter()
    const { nis, nama, no_telp, jenis_kelamin, jurusan, angkatan } = router.query
    const host = typeof window !== 'undefined' && window.location.host ? window.location.host : '';
    const http = host === 'localhost:3000' ? 'http' : 'https'
    const data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    function generatePDF() {
        let doc = new jsPDF();
        doc.html(document.getElementById("printPDF"), {
            callback: function () {
                doc.save('myDocument.pdf');
            }
        });
    }

    function doCapture() {
        window.scrollTo(0, 0);

        // Convert the div to image (canvas)
        html2canvas(document.getElementById("printPDF")).then(function (canvas) {

            // Get the image data as JPEG and 0.9 quality (0.0 - 1.0)
            let image = canvas.toDataURL("image/jpeg", 1);
            console.log(canvas.toDataURL("image/jpeg", 1))
            console.log(canvas.width)
            console.log(canvas.height)
            let doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();

            let widthRatio = width / canvas.width
            let heightRatio = height / canvas.height

            let ratio = widthRatio > heightRatio ? heightRatio : widthRatio

            doc.addImage(image, 'JPEG', 0, 0, canvas.width * ratio, canvas.height * ratio)
            doc.save(`kartu-anggota-perpus-${nama}-${nis}.pdf`)
            
        });
    }


    return (
        <div onLoad={(e) => { JsBarcode(".barcode").init() }} >
            <div id="cetak" className="d-flex justify-content-center mb-4 mt-2">
                <button
                    className="btn btn-primary"
                    style={{ width: '400px', height: '70px', margin: 'auto' }}
                    onClick={(e) => { doCapture() }}
                >Cetak PDF</button>
            </div>
            <div id="printPDF" style={{padding:'20px'}}>
                <table width="100%" >
                    <tbody>
                        <tr>
                            <td width={25} align="center"><img
                                src="/smk.png" style={{ width: '100px' }} /></td>
                            <td width={50} align="center"><h2>Kartu Anggota Perpustakaan</h2><br /><h2>SMK Nurut Taqwa</h2><br/>
                            <span><b>Petugas Perpustakaan </b>: +62 812 3279 0730 (Bu Reni)</span></td>
                            <td width={5} align="center" >
                                <img className="barcode"
                                    jsbarcode-value={nis}
                                    alt="barcode"

                                />
                            </td>
                        </tr>

                    </tbody></table>
                <hr />
                <table className='d-flex justify-content-center' width="100%">
                    <tbody>
                        <tr>
                            <td style={{ width: '400px' }}><b>Nama :</b> {nama}</td>
                            <td style={{ width: '400px' }}><b>No. Telp :</b> {no_telp}</td>
                            <td style={{ width: '400px' }}><b>Jenis kelamin :</b> {jenis_kelamin}</td>
                        </tr>
                        <tr>
                            <td style={{ width: '400px' }}><b>NIS :</b> {nis}</td>
                            <td style={{ width: '400px' }}><b>Jurusan :</b> {jurusan}</td>
                            <td style={{ width: '400px' }}><b>Angkatan :</b> {angkatan}</td>
                        </tr>

                    </tbody>
                </table>
                <h3 className='d-flex justify-content-center mt-3 mb-3' style={{ color: 'black' }}><b>RIWAYAT PEMINJAMAN</b></h3>
                <table className="table table-bordered my-0" id="dataTable">
                    <thead>
                        <tr>
                            <th className='align-middle'>No.</th>
                            <th className='align-middle' style={{width:'200px', textAlign:'center'}}>No. Induk Buku</th>
                            <th className='align-middle' style={{width:'400px', textAlign:'center'}}>Judul Buku</th>
                            <th className='align-middle'>Tanggal Pinjam</th>
                            <th className='align-middle'>Tanggal Kembali</th>
                            <th className='align-middle'>Paraf Petugas</th>
                            <th className='align-middle' style={{width:'200px'}}>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tbldat, index)=>(
                            <tr key={index}>
                                <td>{tbldat}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
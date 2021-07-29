//@ts-check
import CardDetail from '../../components/user/cardDetail'

export default function DetailBuku(){
    const dataBuku = {idBuku:"B001", imgUrl:"../../assets/img/bse-a_5a0260a47533a722057742.jpg", judulBuku:"Desain Multimedia", 
                pengarang:"Adi Mulu", penerbit:"Erlangga", stokBuku:10, deskripsi:"Buku ini membahas tentang"}
    return(
        <div style={{marginTop:"100px"}}>
            <CardDetail />
        </div>
    )
}
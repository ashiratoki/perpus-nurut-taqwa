//@ts-check
import useSWR from 'swr'

async function fetcher(url){
  const res = await fetch(url);
  return res.json();
}
export default function tes(){
    const url ='http://localhost:3000/api/tb_buku';

    const {data,error} = useSWR(url,fetcher);
  
    if(error){
        return <div>error......</div>
    }
    if(!data){
        return <div>loading......</div>
    }
    //const {results} = data;
    console.log(data);
    return(
        <div>
            {data.map((dt,index)=>(
                <div> {dt.No}</div>
            ))
            }
        </div>
    )
}
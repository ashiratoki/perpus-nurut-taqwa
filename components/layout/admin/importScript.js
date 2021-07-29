//@ts-check
import Helmet from 'react-helmet'

export default function importScript(){
    return(
        <>
            <Helmet>
                <script src="../../assets/bootstrap/js/bootstrap.min.js"></script>
                <script src="../../assets/js/chart.min.js"></script>
                <script src="../../assets/js/bs-init.js"></script>
                <script src="../../assets/js/theme.js"></script>
            </Helmet>
        </>
    )
    
}
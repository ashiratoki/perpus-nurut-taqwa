//@ts-check
import { Helmet } from 'react-helmet'
import Dashboard from '../../components/admin/dashboard'

export default function Home() {

  return (
    <div id="wrapper">
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">

          <div className="container-fluid">
            <Dashboard/>
          </div>
        </div>

      </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
      <Helmet>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="./assets/js/bs-init.js"></script>
        <script src="./assets/js/theme.js"></script>
      </Helmet>
    </div>

  )
}

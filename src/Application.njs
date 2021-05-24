import Nullstack from 'nullstack';
import session from 'express-session';
import Sequelize from 'sequelize';
import initModels from './models/index';
import mysql from 'mysql2';
// import './Application.scss';

import Notification from './components/notifications/Notification';
import Login from './pages/auth/Login';
import Admin from './pages/Admin';
import Error from './Error';

import AddUser from './pages/user/AddUser';
import Dashboard from './pages/dashboard/Dashboard.njs';
import ListUsers from './pages/user/ListUsers.njs';
import { Loading } from './components/Loading.njs';
import AddAnoLeoistico from './pages/ano_leoistico/AddAnoLeoistico.njs';
import ListAnoLeoistico from './pages/ano_leoistico/ListAnoLeoistico.njs';
import ListFundosFinanceiros from './pages/fundos_financeiros/ListFundosFinanceiros.njs';
import AddFundosFinanceiros from './pages/fundos_financeiros/AddFundosFinanceiros.njs';
import ListStatusCampanha from './pages/status_campanha/ListStatusCampanha.njs';
import AddStatusCampanha from './pages/status_campanha/AddStatusCampanha.njs';
import ListStatusTarefas from './pages/status_tarefas/ListStatusTarefas.njs';
import AddStatusTarefas from './pages/status_tarefas/AddStatusTarefas.njs';
import Test from './pages/Test.njs';
import ListReuniao from './pages/reuniao/ListReuniao.njs';
import AddReuniao from './pages/reuniao/AddReuniao.njs';
import ListCampanha from './pages/campanhas/ListCampanha.njs';
import FormCampanha from './pages/campanhas/FormCampanha.njs';

class Application extends Nullstack {
  isDark = false;
  // test_value = 13
  static async start(context) {
    await this.startSessions(context);
    await this.startDatabase(context);
  }

  static async startDatabase(context) {
    const { secrets } = context;
    context.database = new Sequelize(
      secrets.database,
      secrets.dbuser,
      secrets.dbpass,
      {
        host: secrets.dbhost,
        dialect: secrets.dbdriver,
        dialectModule: mysql,
        logging: false,
      }
    );
    initModels(context.database);
  }

  static async startSessions({ secrets, server }) {
    const maxAge = 1000 * 60 * 60 * 24 * 7;
    server.use(
      session({
        secret: secrets.privateKey,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge },
      })
    );
  }

  static async getUser({ request }) {
    return request.session.me;
  }

  async initiate(context) {
    context.isDark = this.isDark;
    context.me = await this.getUser();
  }

  prepare({ page }) {
    page.locale = 'pt-BR';
    page.isDark = false;
  }

  renderHead() {
    return (
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
        />
        <link
          href="/assets/css/material-dashboard.css?v=2.1.0"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
          integrity="sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        {/* <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link> */}
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.1.4/dist/css/datepicker-bs4.min.css"
        ></link> */}
      </head>
    );
  }
  renderFooter() {
    return (
      <>
        <script src="/assets/js/core/jquery.min.js"></script>
        <script src="/assets/js/core/popper.min.js"></script>
        <script src="/assets/js/core/bootstrap-material-design.min.js"></script>
        <script src="https://unpkg.com/default-passive-events"></script>
        <script src="/assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
        <script src="/assets/js/plugins/chartist.min.js"></script>
        <script src="/assets/js/plugins/bootstrap-notify.js"></script>
        <script src="/assets/js/material-dashboard.js?v=2.1.0"></script>
        {/* <script src="/assets/demo/demo.js"></script> */}
        {/* <script src="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.1.4/dist/js/datepicker-full.min.js"></script> */}

        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
        {/* <script src="/assets/start_datepicker.js" ></script> */}
      </>
    );
  }
  render({ me, worker, page }) {
    return (
      <main class={page.isDark ? 'dark-edition' : ''}>
        <Head />
        <Footer />
        <Notification key="notification" />
        {/* {!me && <Login route="/" />} */}
        {worker.fetching && <Loading />}
        {/* {me && ( */}
        <Admin>
          {/* {this.test_value} */}
          <Test
            route="/teste"
            // bind={this.test_value} related_field='id' display_field='ano'
          />
          <Dashboard route="/" />

          <ListUsers route="/user" />
          <AddUser route="/user/add/" />
          <AddUser route="/user/edit/:id" />

          <ListAnoLeoistico route="/ano_leoistico" />
          <AddAnoLeoistico route="/ano_leoistico/add" />
          <AddAnoLeoistico route="/ano_leoistico/edit/:id" />

          <ListFundosFinanceiros route="/fundos_financeiros" />
          <AddFundosFinanceiros route="/fundos_financeiros/add" />
          <AddFundosFinanceiros route="/fundos_financeiros/edit/:id" />

          <ListStatusCampanha route="/status_campanha" />
          <AddStatusCampanha route="/status_campanha/add" />
          <AddStatusCampanha route="/status_campanha/edit/:id" />

          <ListStatusTarefas route="/status_tarefas" />
          <AddStatusTarefas route="/status_tarefas/add" />
          <AddStatusCampanha route="/status_tarefas/edit/:id" />

          <ListReuniao route="/reuniao" />
          <AddReuniao route="/reuniao/add" />
          <AddReuniao route="/reuniao/edit/:id" />

          <ListCampanha route="/campanha"/>
          <FormCampanha route="/campanha/add"/>
          <FormCampanha route="/campanha/edit/:id"/>
        </Admin>
        {/* )} */}
        <Error route="*" />
      </main>
    );
  }
}

export default Application;

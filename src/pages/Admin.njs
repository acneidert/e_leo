import Nullstack from 'nullstack';
import './Admin.scss';

function isMenuActive(path, actualRoute) {
  if (actualRoute === '/' || actualRoute === '') {
    if (path === '/') return true;
    else return false;
  }
  if (path === '/') return false;
  return actualRoute.startsWith(path);
}

class Admin extends Nullstack {
  menu = [
    { name: 'Dashboard', icon: 'las la-home', to: '/' },
    { name: 'Campanha', icon: 'las la-heart', to: '/campanha' },
    { name: 'Reunião', icon: 'las la-business-time', to: '/reuniao' },
    { name: 'Arquivos', icon: 'las la-folder-open', to: '/files' },
    { name: 'Ano Leoístico', icon: 'las la-paw', to: '/ano_leoistico' },
    { name: 'Status Campanhas', icon: 'las la-tag', to: '/status_campanha' },
    { name: 'Status Tarefas', icon: 'las la-tag', to: '/status_tarefas' },
    {
      name: 'Fundos Financeiro',
      icon: 'las la-piggy-bank',
      to: '/fundos_financeiros',
    },
    { name: 'Usuários', icon: 'las la-user', to: '/users' },
  ];
  async toogleTheme(context) {
    context.event.preventDefault();
    context.page.isDark = !context.page.isDark;
    return false;
  }
  renderMenuItem({ to, icon, name, router }) {
    const isActive = isMenuActive(to, router.path);
    return (
      <li class={`nav-item ${isActive ? 'active' : ''}`}>
        <a class="nav-link" href={to}>
          <i class={icon} />
          <p>{name}</p>
        </a>
      </li>
    );
  }
  render({ children, router, isDark }) {
    return (
      <div class="wrapper ">
        <div
          class="sidebar"
          data-color="purple"
          data-background-color="black"
          data-image="https://source.unsplash.com/M3xDlTUuix4/600x1200"
        >
          <div class="logo">
            <a href="/" class="simple-text logo-normal">
              e-LEO
            </a>
          </div>
          <div class="sidebar-wrapper">
            <ul class="nav">
              {this.menu.map((item) => (
                <MenuItem {...item} />
              ))}
            </ul>
          </div>
        </div>
        <div class="main-panel">
          <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
              <div class="navbar-wrapper">
                <a class="navbar-brand" href="javascript:void(0)">
                  {'&nbsp;'}
                </a>
              </div>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="#" onclick={this.toogleTheme}>
                      {isDark && <i class="las la-sun"></i>}
                      {!isDark && <i class="las la-moon"></i>}
                      <p class="d-lg-none d-md-block">
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">
                      <i class="material-icons">notifications</i>
                      <p class="d-lg-none d-md-block">Notifications</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="content">
            <div class="container-fluid">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;

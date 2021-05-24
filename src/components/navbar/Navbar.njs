import Nullstack from 'nullstack';

class Navbar extends Nullstack {
  render() {
    return (
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <button type="button" class="btn btn-primary">
              <i class="las la-bars"></i>
            </button>
            Navbar
          </a>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button class="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;

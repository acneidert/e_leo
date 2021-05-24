import Nullstack from 'nullstack';

class ListUsers extends Nullstack {
  users = []

  static async getUsers({database}){
    return await database.models.users.findAndCountAll();
  }

  async initiate({}){
    const users = await this.getUsers();
    const {count, rows} = users
    this.total = count
    this.users = rows;
  }
  render() {
    return (
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title">Lista de usuário</h4>
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="">
              <th>Ação</th>
              <th>Ativo</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th>Telefone</th>
            </thead>
            <tbody>
              {this.users.map( user => (
                <tr>
                  <td>
                    <a class="btn btn-primary" href={`user/edit/${user.id}`} role="button"><i class="las la-edit"></i></a>  
                  </td>
                  <td class={`${user.active? 'text-success' : 'text-danger'}`}><i class={`las ${user.active? 'la-check-circle' : 'la-times-circle'}`}></i></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.function}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <div class="stats">
           
          </div>
      </div>
      </div>
    );
  }
}

export default ListUsers;

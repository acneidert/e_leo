import Nullstack from 'nullstack';

class FormUser extends Nullstack {
  id = 0;
  name = '';
  email = '';
  password = '';
  reenterpass = '';
  active = true;
  membership_code = '';
  function = null;
  entry_date = '';
  birth_date = '';
  phone = '';
  street = '';
  number = '';
  neighborhood = '';
  postal_code = '';
  city = '';
  federative_unit = '';
  avatar = '';

  async initiate({params}){
      const user = await this.getById({id: params.id})
      
      if(user){
          Object.assign(this, user.dataValues);
          this.password = '';
          this.reenterpass = '';
      }
  }

  static async getById({id, database}){
      return await database.models.users.findOne({where:{ id: id}})
  }

  static async saveUser({ database, user }) {
    return await database.models.users.upsert(user);
  }

  async handleSubmit({ instances }) {
    
    if (this.password !== this.reenterpass) {
      instances.notification.newError({message: 'Senhas devem ser iguais'});
      return;
    }
    const [newUser, created] = await this.saveUser({
      user: {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        reenterpass: this.reenterpass,
        active: this.active,
        membership_code: this.membership_code,
        function: this.function,
        entry_date: this.entry_date,
        birth_date: this.birth_date,
        phone: this.phone,
        street: this.street,
        number: this.number,
        neighborhood: this.neighborhood,
        postal_code: this.postal_code,
        city: this.city,
        federative_unit: this.federative_unit,
        avatar: this.avatar,
      },
    });
    if (created === null) {
      instances.notification.newError({message: 'Erro ao criar usuário'});
    } else {
      instances.notification.newSuccess({message: 'Usuário criado/alterado com sucesso'});
      Object.assign(this, newUser);
      this.password = '';
      this.reenterpass = '';
    }
  }

  render({worker}) {
    // const loadingValidSave = !!worker.queues.saveUser.find(args => args.valid);
    return (
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title">Cadastro de usuário</h4>
        </div>
        <div class="card-body">
          <form onsubmit={this.handleSubmit}>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="nome" class="bmd-label-floating">
                  Nome
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="nome"
                  bind={this.name}
                />
              </div>

              <div class="form-group col-md-6">
                <label for="email" class="bmd-label-floating">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  bind={this.email}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="senha" class="bmd-label-floating">
                  Senha
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="senha"
                  bind={this.password}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="reenterpass" class="bmd-label-floating">
                  Digite novamente a Senha
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="reenterpass"
                  bind={this.reenterpass}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="phone" class="bmd-label-floating">
                  Telefone
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  bind={this.phone}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="birth_date">Data de Aniversário</label>
                <input
                  type="date"
                  class="form-control"
                  id="birth_date"
                  bind={this.birth_date}
                />
              </div>
            </div>

            <p class="h3">Informações do Clube</p>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="membership_code" class="bmd-label-floating">
                  Código de Membro
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="membership_code"
                  bind={this.membership_code}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="entry_date">Data de Entrada</label>
                <input
                  type="date"
                  class="form-control"
                  id="entry_date"
                  bind={this.entry_date}
                />
              </div>
              <div class="form-group col-md-12">
                <label for="function" class="bmd-label-floating">
                  Função
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="function"
                  bind={this.function}
                />
              </div>
            </div>

            <p class="h3">Endereço</p>

            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="cep" class="bmd-label-floating">
                  CEP
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cep"
                  bind={this.postal_code}
                />
              </div>

              <div class="form-group col-md-4">
                <label for="street" class="bmd-label-floating">
                  Rua
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="street"
                  bind={this.street}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="number" class="bmd-label-floating">
                  Número
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="number"
                  bind={this.number}
                />
              </div>

              <div class="form-group col-md-4">
                <label for="neighborhood" class="bmd-label-floating">
                  Bairro
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="neighborhood"
                  bind={this.neighborhood}
                />
              </div>

              <div class="form-group col-md-6">
                <label for="city" class="bmd-label-floating">
                  Cidade
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  bind={this.city}
                />
              </div>
              <div class="form-group col-md-2">
                <label for="federative_unit" class="bmd-label-floating">
                  UF
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="federative_unit"
                  bind={this.federative_unit}
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormUser;

import FormDefault from '../../components/CRUD/FormDefault.njs';
import DatePicker from '../../components/DatePicker/DatePicker.njs';
import { Input } from '../../components/Inputs/Input.njs';

class FormUser extends FormDefault {
  model = 'users';
  form_description = 'Cadastro de Usuários';
  id = 0;
  name = '';
  email = '';
  password = null;
  reenterpass = null;
  active = true;
  membership_code = '';
  function = null;
  entry_date = null;
  birth_date = null;
  phone = '';
  street = '';
  number = '';
  neighborhood = '';
  postal_code = '';
  city = '';
  federative_unit = '';
  avatar = '';

  async initiate(context){
    await super.initiate(context)
    this.password = '';
    this.reenterpass = '';
  }

  static async hasEmail({database, email}){
    return await database.models.users.findOne({where: {email: email}});
  }

  async handleSubmit(context) {
    const {instances} = context;
    const hasEmail = await this.hasEmail({email: this.email});
    console.log(hasEmail);
    if (this.password !== this.reenterpass ) {
      instances.notification.newError({ message: 'Senhas devem ser iguais' });
      return;
    }
    if(this.email === ''){
      instances.notification.newError({ message: 'Email inválido' });
      return;
    }
    if(this.email === '' || hasEmail ){
      instances.notification.newError({ message: 'Email inválido' });
      return;
    }
    await super.handleSubmit(context);

    this.password = '';
    this.reenterpass = ''
  }


  render() {
    return (
      <Form>
        <Input name="Nome" bind={this.name} size={6} />
        <Input name="E-mail" bind={this.email} type="email" size={6} />
        <Input name="Senha" bind={this.password} type="password" size={6} />
        <Input name="Digite a Senha novamente" bind={this.reenterpass} type="password" size={6} />
        <Input name="Telefone" bind={this.phone} size={6} />
        <DatePicker name="Data de Aniversário" bind={this.birth_date} size={6} />
        {/* <br />
        <h3>Informações do Clube</h3>
        <br /> */}
        <Input name="Código de Membro" bind={this.membership_code} size={6} />
        <DatePicker name="Data de Entrada" bind={this.entry_date} size={6} />
        <Input name="Função" bind={this.function} size={12} />
        {/* <br />
        <h3>Endereço</h3>
        <br /> */}
        <Input name="CEP" bind={this.postal_code} size={4} />
        <Input name="Rua" bind={this.street} size={4} />
        <Input name="Número" bind={this.number} size={4} />
        <Input name="Bairro" bind={this.neighborhood} size={4} />
        <Input name="Cidade" bind={this.city} size={6} />
        <Input name="UF" bind={this.federative_unit} size={2} />
      </Form>
    );
  }
}

export default FormUser;

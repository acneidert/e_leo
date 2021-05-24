import FormDefault from '../../components/CRUD/FormDefault';
import { Input } from '../../components/Inputs.njs';

class FormStatusCampanha extends FormDefault {
  id = 0;
  descricao = '';
  cor = '';
  icone = '';
  ordem = '';
  model = 'status_campanha';
  form_description = 'Status de Campanha';
  render() {
    return (
      <Form>
        <Input name="Descricao" bind={this.descricao} />
        <Input name="Cor" bind={this.cor} />
        <Input name="icone" bind={this.icone} />
        <Input name="ordem" bind={this.ordem} />
      </Form>
    );
  }
}

export default FormStatusCampanha;

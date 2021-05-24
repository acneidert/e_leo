import FormDefault from '../../components/CRUD/FormDefault';
import { Input } from '../../components/Inputs.njs';

class FormAnoLeoistico extends FormDefault {
  id = 0;
  ano = '';
  presidente = '';
  tesoureiro = '';
  conselheiro = '';

  model = 'ano_leoistico';
  form_description = 'Ano Leoístico';

  render() {
    return (
      <Form>
        <Input bind={this.ano} name="Ano" size="6" />
        <Input bind={this.presidente} name="Presidente" size="6" />
        <Input bind={this.tesoureiro} name="Tesoureiro" size="6" />
        <Input bind={this.conselheiro} name="Conselheiro" size="6" />
      </Form>
    );
  }
}

export default FormAnoLeoistico;

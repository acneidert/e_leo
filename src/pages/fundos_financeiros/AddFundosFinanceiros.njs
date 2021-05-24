import FormDefault from '../../components/CRUD/FormDefault';
import { Input } from '../../components/Inputs.njs';

class AddFundosFinanceiros extends FormDefault {
  descricao = '';
  cor = '';
  icone = '';
  ordem = '';
  model = 'fundos_financeiros';
  form_description = 'Fundo Financeiro';
  render() {
      return(
          <Form>
              <Input name="Descricao" bind={this.descricao} />
              <Input name="Cor" bind={this.cor} />
              <Input name="icone" bind={this.icone} />
              <Input name="ordem" bind={this.ordem} />
          </Form>
      );
  }
}

export default AddFundosFinanceiros;

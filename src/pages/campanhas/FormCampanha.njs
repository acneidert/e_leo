import FormDefault from '../../components/CRUD/FormDefault.njs';
import DatePicker from '../../components/DatePicker.njs';
import { Input } from '../../components/Inputs.njs';
import SelectStatusCampanha from '../status_campanha/SelectStatusCampanha.njs';

class FormCampanha extends FormDefault {
  model = 'campanha';
  form_description = 'Campanhas';

  id=0
  nome = '';
  pasta = '';
  eixo = '';
  data_inicio = '';
  data_fim = '';
  objetivo = '';
  statusCampanhaId = '';
  
  render() {
    return (
      <Form>
        <Input name="Nome" bind={this.nome} size={8} />
        <SelectStatusCampanha
          name="Status"
          bind={this.statusCampanhaId}
          display_field="descricao"
          size={4}
        />
        <Input name="Pasta" bind={this.pasta} size={6} />
        <Input name="Eixo" bind={this.eixo} size={6} />
        <DatePicker name="Data Início" bind={this.data_inicio} size={6} />
        <DatePicker name="Data Final" bind={this.data_fim} size={6} />
        <Input name="Objetivo" bind={this.objetivo} />
      </Form>
    );
  }
}

export default FormCampanha;

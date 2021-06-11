import FormDefault from '../../components/CRUD/FormDefault.njs';
import DatePicker from '../../components/DatePicker/DatePicker.njs';
import { Input } from '../../components/Inputs/Input.njs';
import SelectStatusCampanha from '../status_campanha/SelectStatusCampanha.njs';
import SelectUsers from '../user/SelectUsers.njs';

class FormCampanha extends FormDefault {
  model = 'campanha';
  form_description = 'Campanhas';

  id = 0;
  nome = '';
  pasta = '';
  eixo = '';
  data_inicio = '';
  data_fim = '';
  objetivo = '';
  statusCampanhaId = '';
  lideres_campanhas = [];
  related = [
    {
      model: 'lideres_campanha',
    },
  ];

  async handleSubmit(ctx) {
    console.log(this);
    await super.handleSubmit(ctx);
  }

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
        Líderes de Campanha
        <SelectUsers
          bind={this.lideres_campanhas}
          name="Lideres de Campanha"
          display_field="name"
          related_field="userId"
          multiple
        />
      </Form>
    );
  }
}

export default FormCampanha;

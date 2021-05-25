import FormDefault from '../../components/CRUD/FormDefault';
import DatePicker from '../../components/DatePicker/DatePicker.njs';
import { Checkbox } from '../../components/Inputs/Checkbox.njs';

class FormReuniao extends FormDefault {
  id = 0;
  data = '';
  is_ordinaria = true;

  model = 'reuniao';
  form_description = 'Reunião';

  render() {
    return (
      <Form>
        <DatePicker bind={this.data} name="Data" size="4" />
        <Checkbox bind={this.is_ordinaria} name="Orinária?" size="2" />
      </Form>
    );
  }
}

export default FormReuniao;
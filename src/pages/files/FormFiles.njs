import FormDefault from '../../components/CRUD/FormDefault.njs';
import FilePicker from '../../components/Inputs/FilePicker.njs';
import { Input } from '../../components/Inputs/Input.njs';

class FormFiles extends FormDefault {
  model = 'files';
  id = 0;
  file = null;
  title = '';
  descriptions = '';
  filename_disk = '';
  filename_download = '';
  form_description = 'Arquivos';

  static async testFile(ctx){
    console.log(ctx)
  }

  async handleSubmit({instances}) {
   instances.filePicker.upload();
   
  }

  handleChange({event}){
    this.file = event.srcElement.files[0]
  }

  render() {
    return (
      <Form>
        <Input name="Título do Arquivo" bind={this.title} />
        <FilePicker key="filePicker" bind={this.file} />
      </Form>
    );
  }
}

export default FormFiles;

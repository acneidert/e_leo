import Modal from '../components/Modal/Modal';
import Nullstack from 'nullstack';
import SelectDefault from '../components/CRUD/SelectDefault.njs';
import DatePicker from '../components/DatePicker/DatePicker.njs';
import FilePicker from '../components/Inputs/FilePicker.njs';
import Pagination from '../components/Pagination/Pagination.njs';
import SelectStatusCampanha from './status_campanha/SelectStatusCampanha.njs';

class Test extends Nullstack {
  file = [];

  submit({instances}) {
    // instances.filepicker.upload();
    console.log(this.file);
    // console.log(instances.myModal.toJSON();)
  }

  render() {
    return (
      <>
      <SelectStatusCampanha bind={this.file} display_field="descricao" multiple/>
      <button onclick={this.submit}> Teste </button>
      </>
      // <div>
      //   {/* <FilePicker key="filepicker"/> */}
      //   <Modal key="myModal" header={`Teste Header`} footer={'Footer'}>
      //     Teste
      //   </Modal>
      //   <button type="button" class="btn btn-primary" onclick={this.submit}>Abrir</button>
      //   {/* <button onclick={this.submit}>Upload</button> */}
      // </div>
    );
  }
}

export default Test;

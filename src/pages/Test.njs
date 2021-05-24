import Nullstack from 'nullstack';
import SelectDefault from '../components/CRUD/SelectDefault.njs';
import DatePicker from '../components/DatePicker.njs';
import Pagination from '../components/Pagination.njs';

class Test extends Nullstack {
  // search_description='Ano Leoístico'
  // model = 'ano_leoistico';
  // columns = [
  //   {header: 'Id', name:'id'},
  //   {header: 'Ano', name: 'ano'},
  //   {header: 'Presidente', name:'presidente'},
  //   {header: 'Tesoureiro', name:'tesoureiro'},
  //   {header: 'Conselheiro', name:'conselheiro'},
  // ]
  dateNull = null
  dateEmpty = ''
  date00 = '01/05/2021';
  date01 = '01/01/2021';
  date02 = new Date(2015, 0, 1);
  dateError = '33/18/2021';
  debug(){
    console.log(this.dateNull);
  }
  render() {
    return (
      <>
        <DatePicker bind={this.dateNull} onchange={this.debug}/>
        <DatePicker bind={this.dateEmpty} />
        <DatePicker bind={this.date00} />
        <DatePicker bind={this.date01} />
        <DatePicker bind={this.date02} />
        {/* {this.dateError}: <DatePicker bind={this.dateError} /> */}
      </>
    );
  }
}

export default Test;

import SelectDefault from '../../components/CRUD/SelectDefault.njs';

class SelectStatusCampanha extends SelectDefault {
  search_description = 'Status Campanha';
  model = 'status_campanha';
  columns = [
    { header: 'Id', name: 'id' },
    { header: 'Descrição', name: 'descricao' },
    { header: 'Cor', name: 'cor' },
    { header: 'Icone', name: 'icone' },
    { header: 'Ordem', name: 'ordem' },
  ];
}

export default SelectStatusCampanha;

import Select from '../../components/CRUD/Select.njs';

class SelectStatusCampanha extends Select {
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

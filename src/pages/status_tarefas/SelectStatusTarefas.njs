import Select from '../../components/CRUD/Select.njs';

class SelectStatusTarefas extends Select {
  search_description = 'Status Tarefas';
  model = 'status_tarefas';
  columns = [
    { header: 'Id', name: 'id' },
    { header: 'Descrição', name: 'descricao' },
    { header: 'Cor', name: 'cor' },
    { header: 'Icone', name: 'icone' },
    { header: 'Ordem', name: 'ordem' },
  ];
}

export default SelectStatusTarefas;

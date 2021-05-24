import SelectDefault from '../../components/CRUD/SelectDefault.njs';

class SelectStatusTarefas extends SelectDefault {
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

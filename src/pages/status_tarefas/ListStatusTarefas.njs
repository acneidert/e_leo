import { DeleteButton } from '../../components/CRUD/ActionsButtons.njs';
import { EditButton } from '../../components/CRUD/ActionsButtons.njs';
import ListDefault from '../../components/CRUD/ListDefault';

class ListStatusTarefas extends ListDefault {
  
 model='status_tarefas'
 table_description='Status de Tarefas'
 columns = [
    {
      header: 'Ação',
      name: 'id',
      class: 'td-actions',
      renderer: 'actionsButtons',
    },
    { header: 'Descrição', name: 'descricao'},
    { header: 'Cor', name: 'cor'},
    { header: 'Icone', name: 'icone'},
    { header: 'Ordem', name: 'ordem'},
 ]
}

export default ListStatusTarefas;
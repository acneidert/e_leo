import ListDefault from '../../components/CRUD/ListDefault';

class ListStatusCampanha extends ListDefault {
  
 model='status_campanha'
 table_description='Status de Campanhas'
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

export default ListStatusCampanha;
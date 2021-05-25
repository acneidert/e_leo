import ListDefault from '../../components/CRUD/ListDefault.njs';

class ListCampanha extends ListDefault {
  model = 'campanha';
  related = [
    { model: 'status_campanha' }
  ]
  table_description = 'Campanhas';
  columns = [
    {
      header: 'Ação',
      name: 'id',
      class: 'td-actions',
      renderer: 'actionsButtons',
    },
    { header: 'Nome', name: 'nome' },
    { header: 'Pasta', name: 'pasta' },
    { header: 'Eixo', name: 'eixo' },
    { header: 'Início', name: 'data_inicio', renderer: 'rendererData' },
    { header: 'Fim', name: 'data_fim', renderer: 'rendererData' },
    { header: 'Objetivo', name: 'objetivo' },
    { header: 'Status', name: 'status_campanha.descricao' },
  ];
}

export default ListCampanha;

import ListDefault from '../../components/CRUD/ListDefault.njs';

class ListAnoLeoistico extends ListDefault {
  model = 'ano_leoistico';
  table_description = 'Ano Leoístico';
  columns = [
    {
      header: 'Ação',
      name: 'id',
      class: 'td-actions',
      renderer: 'actionsButtons',
    },
    { header: 'Ano', name: 'ano' },
    { header: 'Presidente', name: 'presidente' },
    { header: 'Tesoureiro', name: 'tesoureiro' },
    { header: 'Conselheiro', name: 'conselheiro' },
  ];
  
}

export default ListAnoLeoistico;

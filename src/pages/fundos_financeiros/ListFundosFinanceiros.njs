import ListDefault from '../../components/CRUD/ListDefault';

class ListFundosFinanceiros extends ListDefault {
  model = 'fundos_financeiros';
  table_description = 'Fundo Financeiro';

  renderEditButton(ctx) {
    return super.renderEditButton(ctx);
  }

  renderDeleteButton(ctx) {
    return super.renderDeleteButton(ctx);
  }

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
  ];
}

export default ListFundosFinanceiros;

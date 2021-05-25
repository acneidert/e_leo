import ListDefault from '../../components/CRUD/ListDefault.njs';

class ListReuniao extends ListDefault {
  model = 'reuniao';
  table_description = 'Reunião';
  columns = [
    {
      header: 'Ação',
      name: 'id',
      class: 'td-actions',
      renderer: 'actionsButtons',
    },
    { header: 'Data', name: 'data', renderer: 'rendererData' },
    { header: 'Ordinária', name: 'is_ordinaria', renderer: 'renderOrdinaria' },
  ];

  renderOrdinaria({ value }) {
    return (
      <td>
        <span class={`${value ? 'text-success' : 'text-danger'}`}>
          <i class={`las ${value ? 'la-check-circle' : 'la-times-circle'}`}></i>
        </span>
      </td>
    );
  }
}

export default ListReuniao;

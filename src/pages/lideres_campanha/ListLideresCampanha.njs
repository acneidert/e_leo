import Nullstack from 'nullstack';
import ListDefault from '../../components/CRUD/ListDefault.njs';

class ListLideresCampanha extends ListDefault {
  
    model = 'campanha'
    table_description = 'Lideres Campanha'
    related = [
        { model: 'users' },
    ]
    columns = [
        {
            header: 'Ação',
            name: 'id',
            class: 'td-actions',
            renderer: 'actionsButtons',
          },
          { header: 'Nome', name: 'users.nome' },
    ]
    link_add = ''
    campanha = ''

    initiate(ctx){
        const {campanha} = ctx;
        this.campanha = campanha;
        super.initiate();
    }   

}

export default ListLideresCampanha;
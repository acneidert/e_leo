import Select from '../../components/CRUD/Select.njs';

class SelectUsers extends Select {
    search_description = 'Usuários'
    model = 'users'
    columns = [
        { header: 'Id', name: 'id' },
        { header: 'Nome', name: 'name' },
        { header: 'Função', name: 'function' },
        { header: 'Telefone', name: 'phone' },
      ];
    prepare({name}){
        this.search_description = name;
    }
}

export default SelectUsers;
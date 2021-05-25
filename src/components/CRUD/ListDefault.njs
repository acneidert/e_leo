import Nullstack from 'nullstack';
import { CardDefault } from '../CardDefault.njs';
import Pagination from '../Pagination.njs';
import Table from '../Table.njs';
import { paginate } from '../../util/paginate';
import { queryBuilder } from '../../util/queryBuilder';
import { queryRelated } from '../../util/queryRelated';

import {
  DeleteButton,
  EditButton,
} from '../../components/CRUD/ActionsButtons.njs';

import './ListDefault.scss';

class ListDefault extends Nullstack {
  model = '';
  table_description = '';
  related = []
  columns = [];
  data = [];
  total = 0;

  /**/
  pagination = null;
  search = null;

  static async getAll({ database, model, pagination = null, search = null, related = null }) {
    return await database.models[model].findAndCountAll({
      ...queryRelated({related, database}),
      ...queryBuilder(search),
      ...paginate(pagination),
    });
  }

  static async deleteById({ database, id, model }) {
    return await database.models[model].destroy({ where: { id: id } });
  }

  async handleDelete({ instances, data }) {
    const deleted = await this.deleteById({ id: data.id, model: this.model });
    const idx = this.data.findIndex((ele) => ele.id === data.id);
    if (deleted) {
      this.data.splice(idx, 1);
      instances.notification.newSuccess({
        message: `${this.table_description} excluído com sucesso`,
      });
      return;
    }
    instances.notification.newError({
      message: `Erro ao Excluir ${this.table_description}`,
    });
    return;
  }

  async initiate() {
    this.data = [];
    const obj = await this.getAll({
      model: this.model,
      related: this.related,
      search: {
        query: this.search,
        cols: this.buildSearch(),
      },
      pagination: this.pagination,
    });
    const { count, rows } = obj;
    this.total = count;
    this.data = rows;
  }

  async getRows() {
    await this.initiate();
  }

  buildSearch() {
    return this.columns.map((column) => {
      return column.name;
    });
  }

  getLinkAdd() {
    if (typeof this.link_add === 'undefined') return `${this.model}/add`;
    return this.link_add;
  }

  getLinkEdit() {
    if (typeof this.link_edit === 'undefined') return `${this.model}/edit`;
    return this.link_add;
  }

  actionsButtons({ value, class: klass }) {
    return (
      <td class={klass}>   
        <div class="btn-group">
          <EditButton id={value} link={this.getLinkEdit()} />
          <DeleteButton id={value} click={this.handleDelete} />
        </div>
      </td>
    );
  }
  rendererData({ value }) {
    try {
      return <td>{value.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>;
    } catch (e) {
      return <td>{value}</td>;
    }
  }

  render({ self }) {
    return (
      <CardDefault
        title={this.table_description}
        link_add={this.getLinkAdd()}
        footer={
          <Pagination
            total={this.total}
            pageSize={20}
            total={this.total}
            bind={this.pagination}
            onchange={this.getRows}
          />
        }
      >
        <Table columns={this.columns} data={this.data} reference={self.key} />
      </CardDefault>
    );
  }
}

export default ListDefault;

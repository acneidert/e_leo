import Nullstack from 'nullstack';
import { paginate } from '../../util/paginate';
import { queryBuilder } from '../../util/queryBuilder';
import { Checkbox } from '../Inputs/Checkbox.njs';
import { Input } from '../Inputs/Input.njs';
import Pagination from '../Pagination/Pagination.njs';
import './SelectMany.scss';

class SelectMany extends Nullstack {
  /* Podem Ser Alterado*/
  model = null;
  columns = [];
  data = [];
  total = 0;
  search_description = '';

  /*Evitar de Ser alterado*/
  timer_search = null;
  search = null;
  selected_description = [];
  selected_value = [];
  pagination = null;

  prepare({ model, columns, data, total, search_description }) {
    this.model = model;
    this.columns = columns;
    this.data = data;
    this.total = total;
    this.search_description = search_description;
  }


  getSelectedDesc() {
    return this.selected_description.join(', ');
  }

  setValue({ data, onchange }) {
    if (this.selected_value.includes(data.value)) {
      const idx = this.selected_value.findIndex((el) => el === data.value);
      this.selected_value.splice(idx, 1);
      this.selected_description.splice(idx, 1);
    } else {
      this.selected_value.push(data.value);
      this.selected_description.push(data.display);
    }
    const value = _.cloneDeep(this.selected_value);
    onchange({ value, onchange });
  }

  cancelSelect({ onchange, data }) {
    this.selected_description = [];
    const value = null;
    data.display = [];
    onchange({ value, data });
  }

  buildSearch() {
    return this.columns.map((column) => {
      return column.name;
    });
  }

  static async getAll({ database, model, pagination = null, search = null }) {
    return await database.models[model].findAndCountAll({
      ...queryBuilder(search),
      ...paginate(pagination),
    });
  }

  handleSearch({ event }) {
    clearTimeout(this.timer_search);
    this.timer_search = setTimeout(() => {
      this.getRows();
    }, 1000);

    if (event && event.keyCode === 13) {
      event.preventDefault();
      clearTimeout(this.timer_search);
      this.getRows();
    }
  }

  terminate() {
    clearTimeout(this.timer_search);
  }

  async getRows({ event }) {
    var ischange = false;
    if (event && event.type === 'change') ischange = true;

    if (this.model !== null) {
      const obj = await this.getAll({
        model: this.model,
        pagination: this.pagination,
        search: {
          query: this.search,
          cols: this.buildSearch(),
        },
      });
      if (obj) {
        const { count, rows } = obj;
        this.total = count;
        this.data = rows;
      }
    }
  }

  static async getById({ id, model, database }) {
    return await database.models[model].findAll({ where: { id: id } });
  }

  async initiate({ value, related_field = 'id', display_field = 'id' }) {
    if(value === undefined) value = [];
    const ret = await this.getById({ id: value, model: this.model });
    if (ret) {
      ret.forEach((row) => {
        this.selected_value.push(row[related_field]);
        this.selected_description.push(row[display_field]);
      });
    }
  }

  render({ source, bind, related_field = 'id', display_field = 'id',  size = 12 }) {
    return (
      <div class={`form-group col-md-${size} bmd-form-group is-filled`}>
        <div class="input-group">
          <div class="input-group-prepend">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target={`#select-${this.model}`}
              onclick={this.getRows}
            >
              <i class="las la-search"></i>
            </button>
          </div>
          <input
            name={this.search_description}
            size
            value={this.getSelectedDesc()}
            type="text"
            class="form-control pl-2"
            id={`search-${this.model}`}
            placeholder={this.search_description}
            disabled
          />
        </div>
        <div
          class="modal fade search-modal"
          id={`select-${this.model}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby=""
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="card">
                <div class="card-header card-header-primary">
                  <div class="row">
                    <div class="col-md-4">
                      <h4 class="mt-2">{this.search_description}</h4>
                      <p class="card-category">Clique para selecionar</p>
                    </div>
                    <div class="col-md-8 float-right">
                      <div class="form-row">
                        <Input
                          default
                          name="Buscar"
                          bind={this.search}
                          onkeydown={this.handleSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered table-sm table-hover">
                      <thead>
                        <tr>
                          <th></th>
                          {this.columns.map((column) => (
                            <th>{column.header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {this.data.map((dataRow) => {
                          return (
                            <tr
                              onclick={this.setValue}
                              data-value={dataRow[related_field]}
                              data-display={dataRow[display_field]}
                            >
                              <td>
                                {' '}
                                <Checkbox
                                  checked={this.selected_value.includes(
                                    dataRow[related_field]
                                  )}
                                />{' '}
                              </td>
                              {this.columns.map((column) => (
                                <td> {dataRow[column.name]} </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    pageSize={10}
                    total={this.total}
                    bind={this.pagination}
                    onchange={this.getRows}
                  />
                </div>
                <div class="card-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onclick={this.cancelSelect}
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectMany;

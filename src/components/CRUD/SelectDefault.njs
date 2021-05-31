import Nullstack from 'nullstack';
import { paginate } from '../../util/paginate';
import { queryBuilder } from '../../util/queryBuilder';
import { Input } from '../Inputs/Input.njs';
import Pagination from '../Pagination/Pagination.njs';
import './SelectDefault.scss';

class SelectDefault extends Nullstack {
  /* Podem Ser Alterado*/
  model = null;
  columns = [];
  data = [];
  total = 0;
  search_description = '';

  /*Evitar de Ser alterado*/
  timer_search = null;
  search = null;
  selected_description = '';
  selected_value = '';
  pagination = null;

  setValue({ data, onchange }) {
    this.selected_value = data.value;
    this.selected_description = data.display;
    const value = data.value;
    onchange({ value, data });
  }

  cancelSelect({ onchange, data }) {
    this.selected_description = '';
    const value = null;
    data.display = '';
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
    // (onchange && onchange({onchange}))
  }

  static async getById({ id, model, database }) {
    return await database.models[model].findOne({ where: { id: id } });
  }

  async initiate({ value, related_field = 'id', display_field = 'id' }) {
    const ret = await this.getById({ id: value, model: this.model });
    if (ret) {
      this.selected_description = ret.dataValues[display_field];
      this.selected_value = ret.dataValues[related_field];
    }
  }

  render({ source, bind, related_field = 'id', display_field = 'id' }) {
    return (
      <div class="form-group bmd-form-group is-filled">
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
            value={this.selected_description}
            bind={this.selected_description}
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
                              class={
                                this.selected_value === dataRow[related_field]
                                  ? 'table-primary'
                                  : ''
                              }
                            >
                              {this.columns.map((column) => (
                                <td> {dataRow[column.name]}</td>
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
                  {/* <button
                    type="button"
                    class="btn btn-secondary"
                  >
                    Adicionar
                  </button> */}
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

export default SelectDefault;

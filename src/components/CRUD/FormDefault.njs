import Nullstack from 'nullstack';
import toParam from '../../util/toParam';
import { CardDefault } from '../Card/CardDefault.njs';
import _ from 'lodash';
import { queryRelated } from '../../util/queryRelated';
import toJson from '../../util/toJson';

class FormDefault extends Nullstack {
  model = '';
  form_description = '';
  link_list = undefined;
  link_add = undefined;
  related = [];

  id_field = 'id';

  async initiate({ params }) {
    const ret = await this.getById({
      id: params.id,
      model: this.model,
      related: this.related,
      id_field: this.id_field,
    });
    if (ret) {
      _.forOwn(ret, (value, key) => {
        // Just get Class values
        if (_.has(this, key)) _.set(this, key, value);
      });
    }
  }

  isNew() {
    return this[this.id_field] === 0;
  }

  getMode() {
    return this.isNew() ? 'Adicionado' : 'Editado';
  }
  getModeInfi() {
    return this.isNew() ? 'Adicionar' : 'Editar';
  }

  async handleSubmit({ instances }) {
    const [newObj, created] = await this.save({
      isNew: this.isNew(),
      model: this.model,
      value: toParam({ ...this }),
      related: this.related,
      id_field: this.id_field,
    });
    if (created === null) {
      instances.notification.newError({
        message: `Erro ao ${this.getModeInfi()} ${this.form_description}`,
      });
    } else {
      instances.notification.newSuccess({
        message: `${this.form_description} ${this.getMode()} com sucesso`,
      });
      Object.assign(this, newObj);
    }
  }

  getLinkList() {
    if (typeof this.link_list === 'undefined') return `/${this.model}`;
    return this.link_list;
  }

  getLinkAdd() {
    if (this.isNew()) return '';
    if (typeof this.link_add === 'undefined') return `/${this.model}/add`;
    return this.link_add;
  }

  static async save({
    database, isNew, model,
    id_field, value, related = null,
  }) {
    const transaction = await database.transaction();
    var retModel = [null, null];
    try {
      var newOrUpdate = undefined;
      if (isNew) {
        delete value[id_field];
        newOrUpdate = await database.models[model].create(value, {
          transaction,
        });
      } else {
        const where = {};
        where[id_field] = value[id_field];
        delete value[id_field];
        newOrUpdate = await database.models[model].update(value, {
          where: where,
          transaction,
        });
      }

      // if (related instanceof Array) {
      //   related.map((relate) => {
      //     database.models[relate.model].find();
      //   });
      // }
      
      retModel = [newOrUpdate, true]
      await transaction.commit();
    } catch (error) {
      console.error(error)
      if (transaction) await transaction.rollback();
    }

    // ...queryRelated({ related, database })
    return retModel;
  }

  static async getById({ id, model, database, related = null, id_field }) {
    const where = {};
    where[id_field] = id;
    return toJson(
      await database.models[model].findOne({
        where: where,
        ...queryRelated({ related, database }),
      })
    );
  }

  renderForm({ children, enctype = '' }) {
    return (
      <CardDefault
        title={`${this.getModeInfi()} ${this.form_description}`}
        link_back={this.getLinkList()}
        link_add={this.getLinkAdd()}
      >
        <form onsubmit={this.handleSubmit} enctype={enctype}>
          <div class="form-row">{children}</div>
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
        </form>
      </CardDefault>
    );
  }
}

export default FormDefault;

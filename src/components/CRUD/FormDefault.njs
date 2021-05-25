import Nullstack from 'nullstack';
import toParam from '../../util/toParam';
import { CardDefault } from '../CardDefault.njs';
import _ from 'lodash';

class FormDefault extends Nullstack {
  model = '';
  form_description = '';

  async initiate({ params }) {
    const ret = await this.getById({ id: params.id, model: this.model });
    if (ret) {
      _.forOwn(ret.dataValues, (value, key) => {
        // Just get Class values
        if (_.has(this, key)) _.set(this, key, value);
      });
    }
  }

  getModo() {
    return this.id === 0 ? 'Adicionado' : 'Editado';
  }
  getModoInfi() {
    return this.id === 0 ? 'Adicionar' : 'Editar';
  }

  async handleSubmit({ instances }) {
    const [newObj, created] = await this.save({
      value: toParam({ ...this }),
      model: this.model,
    });
    if (created === null) {
      instances.notification.newError({
        message: `Erro ao ${this.getModoInfi()} ${this.form_description}`,
      });
    } else {
      instances.notification.newSuccess({
        message: `${this.form_description} ${this.getModo()} com sucesso`,
      });
      Object.assign(this, newObj);
    }
  }

  static async save({ database, model, value }) {
    return await database.models[model].upsert(value);
  }

  static async getById({ id, model, database }) {
    return await database.models[model].findOne({ where: { id: id } });
  }

  renderForm({ children }) {
    return (
      <CardDefault title={`${this.getModoInfi()} ${this.form_description}`}>
        <form onsubmit={this.handleSubmit}>
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

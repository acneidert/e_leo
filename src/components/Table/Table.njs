import Nullstack from 'nullstack';
import _ from 'lodash';

class Table extends Nullstack {
  displayData({
    value,
    row,
    renderer = null,
    reference = '',
    instances,
    class: klass = '',
  }) {
    if (typeof renderer !== 'string') return <td class={klass}>{value}</td>;
    if (reference === '') return <td class={klass}>{value}</td>;
    return instances[reference][renderer]({ value, row, class: klass });
  }

  render({ columns = [], data = [], reference = '' }) {
    return (
      <div class="table-responsive text-nowrap">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              {columns.map((column) => (
                <th>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((dataRow) => (
              <tr>
                {columns.map((column) => (
                  <>
                    {this.displayData({
                      value: _.get(dataRow, column.name),
                      row: dataRow,
                      renderer: column.renderer,
                      reference: reference,
                      class: column.class,
                    })}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;

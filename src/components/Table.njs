import Nullstack from 'nullstack';

class Table extends Nullstack {
  displayData({ value, renderer = null, reference = '', instances }) {
    if (typeof renderer !== 'string') return value;
    if (reference === '') return value;
    return instances[reference][renderer]({ value });
  }

  render({ columns = [], data = [], reference = '' }) {
    return (
      <table class="table table-bordered table-sm table-hover">
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
                <td class={column.class}>
                  {this.displayData({
                    value: dataRow[column.name],
                    renderer: column.renderer,
                    reference: reference,
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;

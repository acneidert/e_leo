import Nullstack from 'nullstack';
import SelectDefault from './SelectDefault.njs';
import SelectMany from './SelectMany.njs';

class Select extends Nullstack {
  model = null;
  columns = [];
  data = [];
  total = 0;
  search_description = '';

  render({
    multiple = false,
    bind,
    source,
    related_field = 'id',
    display_field = 'id',
    size = 12,
  }) {
    return (
      <>
        {!multiple && (
          <SelectDefault
            {...this}
            size={size}
            bind={bind}
            source={source}
            related_field={related_field}
            display_field={display_field}
          />
        )}
        {multiple && (
          <SelectMany
            {...this}
            size={size}
            bind={bind}
            source={source}
            related_field={related_field}
            display_field={display_field}
          />
        )}
      </>
    );
  }
}

export default Select;

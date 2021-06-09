import uuidv4 from '../../util/uuidv4';
export function Checkbox({
    size = 12,
    name = '',
    source,
    bind,
    disabled = false,
    checked = false
  }) {
    const idUuidv4 = uuidv4();
    const nameId = name.toLocaleLowerCase();
    const id = `${nameId}-${idUuidv4}`;
  
    return (
      <div class={`form-group col-md-${size}`}>
        <div class={`form-check`}>
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id={id}
              bind={bind}
              source={source}
              disabled={disabled}
              checked={checked}
            />
            {name}
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
      </div>
    );
  }
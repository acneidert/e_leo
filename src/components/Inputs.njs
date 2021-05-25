import uuidv4 from '../util/uuidv4';
export function Input({
  size = 12,
  name = '',
  type = 'text',
  default :def = false,
  source,
  bind,
  disabled = false,
  class: klass,
  onchange,
  oninput,
  onkeydown,
  onkeyup,
  onkeypress,
}) {
  const idUuidv4 = uuidv4();
  const nameId = name.toLocaleLowerCase();
  const id = `${nameId}-${idUuidv4}`;

  return (
    <div
      class={`form-group input-with-post-icon  md-outline ${klass} col-md-${size}`}
    >
      <label for={id}>{name}</label>
      <input
        default={def}
        type={type}
        class={`form-control`}
        bind={bind}
        source={source}
        disabled={disabled}
        id={id}
        onchange={onchange}
        oninput={oninput}
        onkeydown={onkeydown}
        onkeyup={onkeyup}
        onkeypress={onkeypress}
      />
    </div>
  );
}

export function Checkbox({
  size = 12,
  name = '',
  source,
  bind,
  disabled = false,
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

export function FilePicker() {
  return (
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroupFileAddon01">
          Upload
        </span>
      </div>
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
        />
        <label class="custom-file-label" for="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  );
}

import uuidv4 from '../../util/uuidv4';
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

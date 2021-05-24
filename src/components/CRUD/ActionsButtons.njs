export function EditButton({ id, link }) {
  return (
    <a
      type="button"
      href={`${link}/${id}`}
      class="btn btn-primary"
      role="button"
      key={`${id}-edit`}
    >
      <i class="las la-edit"></i>
    </a>
  );
}

export function DeleteButton({ id, click }) {
  return (
    <button
      type="button"
      class="btn btn-warning"
      onclick={click}
      data-id={id}
      key={`${id}-delete`}
    >
      <i class="las la-trash-alt"></i>
    </button>
  );
}

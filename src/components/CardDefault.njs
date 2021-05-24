export function CardDefault({ title = '', link_add = '', children, footer=(<></>) }) {
  return (
    <div class="card">
      <div class="card-header card-header-primary">
        <div class="row">
          <div class="col-md-10">
            <h4 class="mt-2">{title}</h4>
          </div>
          <div class="col-md-2 float-right">
            {link_add !== '' && (
              <div class="float-right">
                <a class="btn btn-primary btn-sm" href={link_add}>
                  +
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="card-body">{children}{footer}</div>
      {footer !== null && <div class="card-footer"></div>}
    </div>
  );
}

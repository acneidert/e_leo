export function CardDefault({
  title = '',
  link_add = '',
  link_back = '',
  children,
  footer = <></>,
}) {
  const hasButtons = link_add !== '' || link_back !== '';
  return (
    <div class="card">
      <div class="card-header card-header-primary">
        <div class="row">
          <div class="col-md-10">
            <h4 class="mt-2">{title}</h4>
          </div>
          <div class="col-md-2 float-right">
            {hasButtons && (
              <div class="float-right">
                <div class="btn-group">
                  {link_add !== '' && (
                    <a class="btn btn-primary btn-sm" href={link_add}>
                      + Novo
                    </a>
                  )}
                  {link_back !== '' && (
                    <a class="btn btn-primary btn-sm" href={link_back}>
                      ← Voltar
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="card-body">
        {children}
        {footer}
      </div>
      {footer !== null && <div class="card-footer"></div>}
    </div>
  );
}

import Nullstack from 'nullstack';

class Pagination extends Nullstack {
  pageSize = 20;
  page = 1;

  initiate({ pageSize = 20 }) {
    this.pageSize = pageSize;
  }

  handlePageSize() {
    this.page = 1;
    this.setPagination();
  }

  setPagination({ event, onchange }) {
    // console.log(event)
    const value = {
      page: this.page,
      pageSize: this.pageSize,
    };
    onchange({ value });
  }

  handleNavigation({ data }) {
    this.page = data.page;
    this.setPagination();
  }

  render({ total }) {
    const pageInt = parseInt(this.page, 10);
    const totalPages = Math.ceil(total / parseInt(this.pageSize, 10));
    return (
      <div class="form-group row">
        <div class="font-weight-light col-12 justify-content-center align-items-center d-flex justify-content-end">
          <span class="pr-2">
            Página : {this.page} / {totalPages} - {total}
          </span>

          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light btn-sm"
              data-page={1}
              onclick={this.handleNavigation}
              disabled={pageInt <= 1}
            >
              <i class="las la-angle-double-left"></i>
            </button>
            <button
              type="button"
              class="btn btn-light btn-sm"
              data-page={pageInt - 1}
              onclick={this.handleNavigation}
              disabled={pageInt <= 1}
            >
              <i class="las la-angle-left"></i>
            </button>
            <select
              class="form-control"
              bind={this.pageSize}
              onchange={this.handlePageSize}
              name="page-select"
              id="page-select"
              key="page-select"
            >
              <option>10</option>
              <option>20</option>
              <option>40</option>
              <option>60</option>
              <option>100</option>
            </select>
            <button
              type="button"
              class="btn btn-light btn-sm"
              data-page={pageInt + 1}
              onclick={this.handleNavigation}
              disabled={pageInt >= totalPages}
            >
              <i class="las la-angle-right"></i>
            </button>
            <button
              type="button"
              class="btn btn-light btn-sm"
              data-page={totalPages}
              onclick={this.handleNavigation}
              disabled={pageInt >= totalPages}
            >
              <i class="las la-angle-double-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;

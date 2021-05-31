import Nullstack from 'nullstack';
import uuidv4 from '../../util/uuidv4';
import './Modal.scss';

class Modal extends Nullstack {
  id = '';
  isShow = false;

  initiate() {
    this.id = `modal-${uuidv4()}`;
  }

  toggle() {
    $(`#${this.id}`).modal('toggle');
  }

  show() {
    $(`#${this.id}`).modal('show');
  }

  hide() {
    $(`#${this.id}`).modal('hide');
  }

  render({ header, children, footer, size=false }) {
    return (
      <div
        class="modal fade search-modal "
        id={this.id}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class={`modal-dialog ${size ? 'modal-' + size : '' }`} role="document">
          <div class="modal-content">
            <div class="card">
              <div class="card-header card-header-primary">{header}</div>
              <div class="card-body">{children}</div>
              <div class="card-footer">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

import Nullstack from 'nullstack';
import './Toast.scss';

class Toast extends Nullstack {
  timeAlive = 10; //seconds
  idNotification = '';
  timer = null;
  parent = '';

  async clearNotification({ instances }) {
    await instances[this.parent].clearNotification({
      idNotification: this.idNotification,
    });
    clearInterval(this.timer);
  }

  async hydrate({ idNotification = '', parent = '' }) {
    this.parent = parent;
    this.idNotification = idNotification;
    this.timer = setTimeout(this.clearNotification, this.timeAlive * 1000);
  }

  async terminate() {
    clearInterval(this.timer);
  }

  render({ message = '', color = 'primary' }) {
    return (
      <div
        class={`alert alert-${color} alert-dismissible fade show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
        data-bs-autohide="false"
      >
        
        <div class="mr-5">{message}</div>
            <div
              class="round-time-bar"
              data-style="smooth"
              style={`--duration: ${this.timeAlive};`}
            >
              <div></div>
            </div>
          <button
            type="button"
            class="close"
            aria-label="Close"
            onclick={this.clearNotification}
            data-dismiss="alert"
          ><span aria-hidden="true">&times;</span></button>
      </div>
    );
  }
}

export default Toast;

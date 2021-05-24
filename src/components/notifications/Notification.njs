import Nullstack from 'nullstack';
import uuidv4 from '../../util/uuidv4';
import Toast from './Toast';
import './Notification.scss';

class Notification extends Nullstack {
  notifications = [];
  newNotification(notification) {
    const color = notification.success ? 'success' : 'danger';
    this._addNotification(notification.message, color);
  }
  newError({ message }) {
    this._addNotification(message, 'danger');
  }
  newSuccess({ message }) {
    this._addNotification(message, 'success');
  }
  newWarning({ message }) {
    this._addNotification(message, 'warning');
  }
  newInfo({ message }) {
    this._addNotification(message, 'primary');
  }

  _addNotification(message, color) {
    this.notifications.push({
      message: message,
      color: color,
      idNotification: uuidv4(),
    });
  }

  initiate() {
    this.notifications = [];
  }

  async clearNotification({ idNotification }) {
    const index = this.notifications.findIndex((notification) => {
      return notification.idNotification === idNotification;
    });
    this.notifications.splice(index, 1);
  }

  clearNotifications() {
    this.initiate();
  }

  render({ key }) {
    if (this.notifications.length === 0) return;
    return (
      <div aria-live="polite" class="notifications" aria-atomic="true" style="min-height: 200px;">
        <div style="top: 0; right: 0;">
          {this.notifications.map((notification) => {
            if (!notification.hasOwnProperty('idNotification')) {
              notification.idNotification = uuidv4();
            }
            return (
              <Toast
                {...notification}
                parent={key}
                key={notification.idNotification}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Notification;

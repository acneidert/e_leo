import Nullstack from 'nullstack';
import { getFileType } from '../../util/getFileType';
import Modal from '../modal/Modal.njs';
import './File.scss';

class File extends Nullstack {
  src = '';
  loaded = false;

  static async getFile({ filename }) {
    const mime = require('mime'); // npm install mime
    const path = require('path');
    const fs = require('fs');
    const filepath = path.resolve(filename);
    const filemime = mime.getType(filepath);
    const type = getFileType(filemime);
    if (type !== 'image') return `/img/filetype/${type}.png`;
    const base64 = fs.readFileSync(filepath, { encoding: 'base64' });
    return `data:${filemime};base64,${base64}`;
  }

  async openModal({ id, instances }) {
    if (!this.loaded) return;
    instances[`file${id}`].show();
    console.log(data);
  }

  closeModal({ instances }) {
    instances[`file${id}`].hide();
  }

  async initiate() {
    this.src = '/img/loading_img.gif';
  }

  async hydrate({ filename_disk }) {
    this.src = await this.getFile({ filename: filename_disk });
    this.loaded = true;
    console.log('teste');
  }

  render({ id, title }) {
    return (
      <div class="col-md-2 col-sm-4 text-center">
        <div class="view overlay" onclick={this.openModal}>
          <img
            src={this.src}
            class="display-files img-fluid "
            alt="Image with a strong blue overlay."
          />
        </div>
        <p class="text-center">{title}</p>
        <Modal size="fluid" key={`file${id}`} header={<Header />} footer={<Footer />}>
          <div class="row">
              <img
                src={this.src}
                class="img-fluid "
                alt="Image with a strong blue overlay."
              />
          </div>
        </Modal>
      </div>
    );
  }
  renderHeader({ title }) {
    return <h3>{title}</h3>;
  }
  renderFooter() {}
}

export default File;

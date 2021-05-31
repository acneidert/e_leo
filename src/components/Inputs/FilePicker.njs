import Nullstack from 'nullstack';
import uuidv4 from '../../util/uuidv4';

class FilePicker extends Nullstack {
  id = '';
  url = '';

  initiate() {
    this.id = uuidv4();
  }

  static async persist({ base64, name }) {
    const { existsSync, mkdirSync, writeFileSync } = await import('fs');
    const mime = require('mime');
    const target = 'files/uploads';
    let file = Buffer.from(base64, 'base64');

    if (!existsSync(target)) {
      mkdirSync(target);
    }
    const filepath = `${target}/${new Date().getTime()}-${name}`;
    writeFileSync(filepath, file);
    const filemime = mime.getType(filepath);
    return `data:${filemime};base64,${base64}`;
  }

  upload() {
    const input = document.getElementById(this.id);
    for (const file of input.files) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async () => {
        const base64 = btoa(reader.result);
        this.url = '/img/loading_img.gif';
        this.url = await this.persist({ base64, name: file.name });
        this.value = '';
        input.value = '';
      };
    }
  }

  render() {
    return (
      <>
        <img src={this.url}></img>
        <div class="input-group">
          <input class="" id={this.id} type="file" />
        </div>
      </>
    );
  }
}

export default FilePicker;

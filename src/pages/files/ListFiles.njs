import ListDefault from '../../components/CRUD/ListDefault.njs';
import { CardDefault } from '../../components/Card/CardDefault.njs';
import Pagination from '../../components/Pagination/Pagination.njs';
import File from '../../components/File/File.njs';

class ListFiles extends ListDefault {
  model = 'files';
  columns = [];
  dataTest = [
    {
      id: 1,
      filename_disk: 'files/uploads/teste.csv',
      filename_download: '',
      description: '',
      title: '1',
    },
    {
      id: 2,
      filename_disk: 'files/uploads/1622062592000-unnamed.zip',
      filename_download: '',
      description: '',
      title: '2',
    },
    {
      id: 3,
      filename_disk: 'files/uploads/teste.docx',
      filename_download: '',
      description: '',
      title: '3',
    },
    {
      id: 4,
      filename_disk: 'files/uploads/teste.txt',
      filename_download: '',
      description: '',
      title: '4',
    },
    {
      id: 5,
      filename_disk: 'files/uploads/teste.xlsx',
      filename_download: '',
      description: '',
      title: '5',
    },
    {
      id: 6,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '6',
    },
    {
      id: 7,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '7',
    },
    {
      id: 8,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '8',
    },
    {
      id: 9,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '9',
    },
    {
      id: 10,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '10',
    },
    {
      id: 11,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '11',
    },
    {
      id: 12,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '12',
    },
    {
      id: 13,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '13',
    },
    {
      id: 14,
      filename_disk: 'files/uploads/1622062592000-unnamed.png',
      filename_download: '',
      description: '',
      title: '14',
    },
  ];

  render() {
    return (
      <CardDefault
        title="Arquivos"
        link_add={this.getLinkAdd()}
        footer={
          <Pagination
            total={this.total}
            pageSize={20}
            total={this.total}
            bind={this.pagination}
            onchange={this.getRows}
          />
        }
      >
        <div class="row">
          {this.dataTest.map((row) => (
            <File {...row} />
          ))}
        </div>
      </CardDefault>
    );
  }
}

export default ListFiles;

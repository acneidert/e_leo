import Nullstack from 'nullstack';

class Teste extends Nullstack {
  teste = ''
  render() {
    return (
      <div> <input bind={this.teste} /> </div>
    )
  }

}

export default Teste;
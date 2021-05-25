import Nullstack from 'nullstack';
import { Input } from '../../components/Inputs/Input.njs';
import './Login.scss';
class Login extends Nullstack {
  username = 'admin';
  password = 'admin';

  static async makeLogoff(context) {
    return;
  }

  static async makeLogin(context) {
    const { username, password } = context;
    if (username === 'admin' && password == 'admin') {
      context.request.session.me = { username: 'admin', isLogged: true };
      return {
        user: context.request.session.me,
        data: { success: true, message: 'Logado com sucesso!' },
      };
    }

    return {
      user: null,
      data: { success: false, message: 'Usuário ou senha incorretos!' },
    };
  }

  async submit(context) {
    const { instances } = context;
    if (this.username !== '' && this.password !== '') {
      const ret = await this.makeLogin({
        username: this.username,
        password: this.password,
      });
      instances.notification.newNotification(ret.data);
      context.me = ret.user;
    }
  }

  render({ me }) {
    return (
      <div class="container-fluid">
        <div class="row no-gutter">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h3 class="login-heading mb-4">Bem Vindo!</h3>
                    <form onsubmit={this.submit}>
                      <Input name="Usuário" bind={this.username} />
                      <Input
                        name="Senha"
                        bind={this.password}
                        type="password"
                      />
                      <button
                        class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Entrar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

import startTenant from './tenant.model'
import startAnoLeoistico from './ano_leoistico.model'
import startCampanha from './campanha.model'
import startFiles from './files.model'
import startFundosFinanceiros from './fundos_financeiros.model'
import startLideresCampanha from './lideres_campanha.model'
import startMovimentacao from './movimentacao.model'
import startParticipantesReuniao from './participantes_reuniao.model'
import startPautaReuniao from './pauta_reuniao.model'
import startResponsaveisTarefas from './responsaveis_tarefas.model'
import startReuniao from './reuniao.model'
import startSaldosFundos from './saldos_fundos.model'
import startStatusCampanha from './status_campanha.model'
import startStatusTarefas from './status_tarefas.model'
import startTarefasCampanhas from './tarefas_campanhas.model'
import startTipoMovimentacao from './tipo_movimentacao.model'
import startUserTenants from './user_tenants.model'
import startUsers from './users.model'
function initModels(database) {
    
    const tenant = startTenant(database);
    const users = startUsers(database);
    const user_tenants = startUserTenants(database);
    const ano_leoistico = startAnoLeoistico(database)
    const campanha = startCampanha(database);
    const files = startFiles(database);
    const fundos_financeiros = startFundosFinanceiros(database);
    const lideres_campanha = startLideresCampanha(database);
    const movimentacao = startMovimentacao(database);
    const participantes_reuniao = startParticipantesReuniao(database);
    const pauta_reuniao = startPautaReuniao(database);
    const responsaveis_tarefas = startResponsaveisTarefas(database);
    const reuniao = startReuniao(database);
    const saldos_fundos = startSaldosFundos(database);
    const status_campanha = startStatusCampanha(database);
    const status_tarefas = startStatusTarefas(database);
    const tarefas_campanhas = startTarefasCampanhas(database);
    const tipo_movimentacao = startTipoMovimentacao(database);
    
    const models = {
        tenant,
        users,
        user_tenants,
        ano_leoistico,
        campanha,
        files,
        fundos_financeiros,
        lideres_campanha,
        movimentacao,
        participantes_reuniao,
        pauta_reuniao,
        responsaveis_tarefas,
        reuniao,
        saldos_fundos,
        status_campanha,
        status_tarefas,
        tarefas_campanhas,
        tipo_movimentacao,
    };

    tenant.associate(models)
    ano_leoistico.associate(models)
    campanha.associate(models)
    files.associate(models)
    fundos_financeiros.associate(models)
    lideres_campanha.associate(models)
    movimentacao.associate(models)
    participantes_reuniao.associate(models)
    pauta_reuniao.associate(models)
    responsaveis_tarefas.associate(models)
    reuniao.associate(models)
    saldos_fundos.associate(models)
    status_campanha.associate(models)
    status_tarefas.associate(models)
    tarefas_campanhas.associate(models)
    tipo_movimentacao.associate(models)
    user_tenants.associate(models)
    users.associate(models)

    
    database.sync({force: false});
    return models;
}
export default initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
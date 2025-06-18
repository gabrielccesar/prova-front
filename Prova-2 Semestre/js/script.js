document.addEventListener('DOMContentLoaded', () => {
    const formularioVoluntario = document.getElementById('formularioVoluntario');
    const idVoluntarioInput = document.getElementById('idVoluntario');
    const nomeInput = document.getElementById('nome');
    const areaInteresseInput = document.getElementById('areaInteresse');
    const numeroEventosInput = document.getElementById('numeroEventos');
    const disponibilidadeFimSemanaInput = document.getElementById('disponibilidadeFimSemana');
    const corpoTabelaVoluntarios = document.querySelector('#tabelaVoluntarios tbody');
    const btnRegistrar = document.getElementById('btnRegistrar');

    let voluntarios = [];

    const carregarVoluntarios = () => {
        const voluntariosArmazenados = localStorage.getItem('voluntarios');
        if (voluntariosArmazenados) {
            voluntarios = JSON.parse(voluntariosArmazenados);
        }
        renderizarVoluntarios();
    };

    const salvarVoluntarios = () => {
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
    };

    const classificarNivelEnvolvimento = (numEventos, temDisponibilidadeFimSemana) => {
        let nivel = '';
        if (numEventos >= 1 && numEventos <= 2) {
            nivel = 'Baixo';
        } else if (numEventos = 3 && numEventos <= 5) {
            nivel = 'Médio';
        } else if (numEventos > 5) {
            nivel = 'Alto';
        }

        if (temDisponibilidadeFimSemana && nivel !== 'Alto') {
            switch (nivel) {
                case 'Baixo':
                    nivel = 'Médio';
                    break;
                case 'Médio':
                    nivel = 'Alto';
                    break;
            }
        }
        return nivel;
    };

    const renderizarVoluntarios = () => {
        corpoTabelaVoluntarios.innerHTML = '';
        voluntarios.forEach(voluntario => {
            const linha = corpoTabelaVoluntarios.insertRow();
            linha.innerHTML = `
                <td data-label="Voluntário">${voluntario.nome}</td>
                <td data-label="Área">${voluntario.areaInteresse}</td>
                <td data-label="Eventos">${voluntario.numeroEventos}</td>
                <td data-label="Fins de Semana">${voluntario.disponibilidadeFimSemana ? 'Sim' : 'Não'}</td>
                <td data-label="Envolvimento">${voluntario.nivelEnvolvimento}</td>
                <td data-label="Ações" class="actions">
                    <button onclick="editarVoluntario('${voluntario.id}')">Editar</button>
                    <button class="excluir" onclick="excluirVoluntario('${voluntario.id}')">Excluir</button>
                </td>
            `;
        });
    };

    const gerarIdUnico = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    formularioVoluntario.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = idVoluntarioInput.value;
        const nome = nomeInput.value;
        const areaInteresse = areaInteresseInput.value;
        const numeroEventos = parseInt(numeroEventosInput.value);
        const disponibilidadeFimSemana = disponibilidadeFimSemanaInput.checked;
        const nivelEnvolvimento = classificarNivelEnvolvimento(numeroEventos, disponibilidadeFimSemana);

        if (id) {
            const indice = voluntarios.findIndex(v => v.id === id);
            if (indice !== -1) {
                voluntarios[indice] = { id, nome, areaInteresse, numeroEventos, disponibilidadeFimSemana, nivelEnvolvimento };
            }
            btnRegistrar.textContent = 'Registrar Voluntário';
        } else {
            const novoVoluntario = {
                id: gerarIdUnico(),
                nome,
                areaInteresse,
                numeroEventos,
                disponibilidadeFimSemana,
                nivelEnvolvimento
            };
            voluntarios.push(novoVoluntario);
        }

        salvarVoluntarios();
        renderizarVoluntarios();
        formularioVoluntario.reset();
        idVoluntarioInput.value = '';
    });

    window.editarVoluntario = (id) => {
        const voluntario = voluntarios.find(v => v.id === id);
        if (voluntario) {
            idVoluntarioInput.value = voluntario.id;
            nomeInput.value = voluntario.nome;
            areaInteresseInput.value = voluntario.areaInteresse;
            numeroEventosInput.value = voluntario.numeroEventos;
            disponibilidadeFimSemanaInput.checked = voluntario.disponibilidadeFimSemana;
            btnRegistrar.textContent = 'Atualizar Voluntário';
        }
    };

    window.excluirVoluntario = (id) => {
        if (confirm('Tem certeza que deseja excluir este voluntário?')) {
            voluntarios = voluntarios.filter(v => v.id !== id);
            salvarVoluntarios();
            renderizarVoluntarios();
        }
    };

    carregarVoluntarios();
});
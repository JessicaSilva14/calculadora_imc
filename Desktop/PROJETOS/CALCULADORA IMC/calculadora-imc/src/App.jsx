import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  // Novo estado para o histórico
  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem('historicoIMC');
    return salvo ? JSON.parse(salvo) : [];
  });

  const getTabelaClassificacao = (valorImc) => {
    const v = parseFloat(valorImc);
    if (v < 18.5) return { classificacao: 'Abaixo do peso', classe: 'abaixo' };
    if (v < 25) return { classificacao: 'Normal', classe: 'normal' };
    if (v < 30) return { classificacao: 'Sobrepeso', classe: 'sobrepeso' };
    if (v < 35) return { classificacao: 'Obesidade Grau I', classe: 'obesidade-1' };
    if (v < 40) return { classificacao: 'Obesidade Grau II', classe: 'obesidade-2' };
    return { classificacao: 'Obesidade Grau III', classe: 'obesidade-3' };
  };

  useEffect(() => {
    const numAltura = parseFloat(altura);
    const numPeso = parseFloat(peso);

    if (numAltura > 0 && numPeso > 0) {
      const alturaMetros = numAltura / 100;
      const valorImc = numPeso / (alturaMetros * alturaMetros);
      setImc(valorImc.toFixed(2));
    } else {
      setImc(null);
    }
  }, [altura, peso]);

  // Salva no localStorage sempre que o histórico mudar
  useEffect(() => {
    localStorage.setItem('historicoIMC', JSON.stringify(historico));
  }, [historico]);

  const salvarResultado = () => {
    if (!imc) return;
    const novaEntrada = {
      id: Date.now(),
      valor: imc,
      classificacao: getTabelaClassificacao(imc).classificacao,
      data: new Date().toLocaleDateString()
    };
    setHistorico([novaEntrada, ...historico]);
  };

  const limparHistorico = () => setHistorico([]);

  const info = imc ? getTabelaClassificacao(imc) : null;

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <label>Altura (cm)</label>
          <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ex: 175" />
        </div>
        <div className="input-group">
          <label>Peso (kg)</label>
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 75" />
        </div>
      </form>

      {imc && (
        <div className="resultado">
          <p>Seu IMC: <strong>{imc}</strong> ({info.classificacao})</p>
          <button onClick={salvarResultado} className="btn-save">Salvar no Histórico</button>
        </div>
      )}

      {/* Tabela de Referência Omitida aqui para brevidade, mas mantenha a sua! */}

      {historico.length > 0 && (
        <div className="historico-secao">
          <div className="header-historico">
            <h2>Histórico Recente</h2>
            <button onClick={limparHistorico} className="btn-clear">Limpar Tudo</button>
          </div>
          <ul className="lista-historico">
            {historico.map((item) => (
              <li key={item.id}>
                <span>{item.data}</span>
                <strong>{item.valor}</strong>
                <span>{item.classificacao}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
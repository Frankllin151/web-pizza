'use client'
import { useState, useEffect } from 'react';
import { ItemCarrinho } from '../type/ItemCarrinho';
import Header from '../componentes/header';


// Interfaces para tipagem
interface Usuario {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
}

interface Pedido {
  id: string;
  data: string;
  status: string;
  itens: ItemCarrinho[];
  total: number;
}

export default function MinhaConta() {
  const dadosUsuario = JSON.parse(localStorage.getItem('user') || '{}');

const token = JSON.parse(localStorage.getItem("token") || '""');


console.log(token);

if(token === "" || !token){
   window.location.href = "/login";
}

  // Estados para os dados do usuário
  const [usuario, setUsuario] = useState<Usuario>({
    nome: dadosUsuario.info.nome ??  "",
    email: dadosUsuario.info.email ??  "",
    cpf: dadosUsuario?.dados?.cpf ?? "",
  telefone: dadosUsuario?.dados?.telefone ?? "",
  endereco: dadosUsuario?.dados?.rua_avenida ?? "",
  numero: dadosUsuario?.dados?.numero ?? "",
  complemento: dadosUsuario?.dados?.complemento ?? "",
  bairro: dadosUsuario?.dados?.bairro ?? "",
  cidade: dadosUsuario?.dados?.cidade ?? ""
  });

  // Estado para edição dos dados
  const [editando, setEditando] = useState<boolean>(false);
  const [dadosEditados, setDadosEditados] = useState<Usuario>({...usuario});
  
  // Estado para histórico de pedidos
  const [historicoPedidos, setHistoricoPedidos] = useState<Pedido[]>([]);
  
  // Estado para abas (dados pessoais, pedidos)
  const [abaAtiva, setAbaAtiva] = useState<'dados' | 'pedidos'>('dados');

  // Carregar dados do usuário e histórico de pedidos
  useEffect(() => {
    // Simular carregamento de dados do usuário do localStorage ou de uma API
    const dadosUsuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (dadosUsuario && Object.keys(dadosUsuario).length > 0) {
      setUsuario(dadosUsuario);
      setDadosEditados(dadosUsuario);
    }

    // Simular carregamento do histórico de pedidos
    const historicoPedidosSalvo = JSON.parse(localStorage.getItem('historicoPedidos') || '[]');
    setHistoricoPedidos(historicoPedidosSalvo);
  }, []);

  // Salvar alterações nos dados do usuário
const salvarAlteracoes = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Montar o body conforme o backend espera
  const body = {
    user_id: dadosUsuario.info.id,
    nome_completo: dadosEditados.nome,
    email: dadosEditados.email,
    cpf: dadosEditados.cpf,
    telefone: dadosEditados.telefone,
    rua_avenida: dadosEditados.endereco,
    numero: dadosEditados.numero,
    complemento: dadosEditados.complemento,
    bairro: dadosEditados.bairro,
    cidade: dadosEditados.cidade,
  };
console.log(body);

  try {
    const response = await fetch(`${apiUrl}/api/dashboard/atualizar-dados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(response);
      
      alert("Erro ao atualizar dados!");
      return;
    }

    // Atualiza o estado local e exibe sucesso
    setUsuario({ ...dadosEditados });
    setEditando(false);
    alert("Dados atualizados com sucesso!");
    console.log(response);
    
  } catch (error) {
    alert("Erro ao conectar com o servidor!");
    console.error(error);
  }
};

  // Cancelar edição
  const cancelarEdicao = () => {
    setDadosEditados({...usuario});
    setEditando(false);
  };

  // Manipular alterações nos campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosEditados(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Formatação de CPF: XXX.XXX.XXX-XX
  const formatarCPF = (cpf: string) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Formatação de telefone: (XX) XXXXX-XXXX
  const formatarTelefone = (telefone: string) => {
    if (!telefone) return '';
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <>
    <Header/>
    
    <div className="bg-gray-100 min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] rounded-md overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-[#1A1A1D] text-white p-6">
            <h1 className="text-2xl font-bold">Minha Conta</h1>
            <p className="text-gray-300">Gerencie seus dados e acompanhe seus pedidos</p>
          </div>

          {/* Abas de navegação */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 font-medium text-center ${abaAtiva === 'dados' ? 'text-[#F97316] border-b-2 border-[#F97316]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setAbaAtiva('dados')}
            >
              Dados Pessoais
            </button>
            <button 
              className={`flex-1 py-3 font-medium text-center ${abaAtiva === 'pedidos' ? 'text-[#F97316] border-b-2 border-[#F97316]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setAbaAtiva('pedidos')}
            >
              Meus Pedidos
            </button>
          </div>

          {/* Conteúdo da aba de dados pessoais */}
          {abaAtiva === 'dados' && (
            <div className="p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
                {!editando ? (
                  <button 
                    onClick={() => setEditando(true)}
                    className="px-4 py-2 bg-[#F97316] text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Editar
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button 
                      onClick={cancelarEdicao}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={salvarAlteracoes}
                      className="px-4 py-2 bg-[#F97316] text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campos de dados pessoais */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="nome" 
                      value={dadosEditados.nome} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.nome || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">E-mail</label>
                  {editando ? (
                    <input 
                      type="email" 
                      name="email" 
                      value={dadosEditados.email} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.email || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">CPF</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="cpf" 
                      value={dadosEditados.cpf} 
                      onChange={handleInputChange}
                      placeholder="Somente números"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.cpf ? formatarCPF(usuario.cpf) : 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Telefone</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="telefone" 
                      value={dadosEditados.telefone} 
                      onChange={handleInputChange}
                      placeholder="Somente números"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.telefone ? formatarTelefone(usuario.telefone) : 'Não informado'}</p>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-6">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Rua/Avenida</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="endereco" 
                      value={dadosEditados.endereco} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.endereco || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Número</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="numero" 
                      value={dadosEditados.numero} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.numero || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Complemento</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="complemento" 
                      value={dadosEditados.complemento} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.complemento || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bairro</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="bairro" 
                      value={dadosEditados.bairro} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.bairro || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cidade</label>
                  {editando ? (
                    <input 
                      type="text" 
                      name="cidade" 
                      value={dadosEditados.cidade} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                  ) : (
                    <p className="text-gray-800">{usuario.cidade || 'Não informado'}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo da aba de pedidos */}
          {abaAtiva === 'pedidos' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Meus Pedidos</h2>
              
              {historicoPedidos.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-500">Você ainda não tem pedidos</h3>
                  <p className="text-gray-400 mt-2">Seus pedidos aparecerão aqui quando você fizer sua primeira compra.</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-6 px-6 py-2 bg-[#F97316] text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Ver Cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {historicoPedidos.map((pedido) => (
                    <div key={pedido.id} className="border border-gray-200 rounded-md overflow-hidden">
                      {/* Cabeçalho do pedido */}
                      <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
                          <p className="text-sm text-gray-500">{pedido.data}</p>
                        </div>
                        <div className="flex items-center">
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' : 
                              pedido.status === 'Em preparo' ? 'bg-blue-100 text-blue-800' : 
                              pedido.status === 'Em entrega' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {pedido.status}
                          </span>
                          <span className="ml-4 font-medium text-gray-800">
                            R$ {pedido.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Itens do pedido */}
                      <div className="p-4">
                        <h4 className="font-medium text-gray-700 mb-3">Itens do pedido</h4>
                        <ul className="space-y-2">
                          {pedido.itens.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <div>
                                <span className="text-gray-800">{item.quantidade}x </span>
                                <span className="text-gray-800">{item.nome} ({item.tamanho})</span>
                              </div>
                              <span className="text-gray-600">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Ações do pedido */}
                      {pedido.status === 'Em preparo' && (
                        <div className="p-4 border-t border-gray-200 flex justify-end">
                          <button className="px-4 py-2 text-sm text-red-600 hover:text-red-800">
                            Cancelar Pedido
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
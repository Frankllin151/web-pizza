"use client";
import { useState, useEffect } from 'react';
import Sidebar from '../componentes/Sidebar';
import { OverviewSection, OrdersSection, ProductsSection , ReportsSection, AddProductNew } from '../componentes/Sidebar';
import { useRouter } from 'next/router';

interface UserData {
  info: {
    tipo: string;
  };
}

export default function Dashboard() {
  
const router = useRouter();
   const [token, setToken] = useState<string | null>(null);
    const [dadosUsuario, setDadosUsuario] = useState<UserData | null>(null);
  useEffect(() => {
    // Este código só será executado no navegador, após o componente ser montado
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
 
  useEffect(() => {
    // Este código só roda no navegador
    const storedDadoUsuario = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Verifica se os dados do usuário existem e têm a estrutura esperada
    if (storedDadoUsuario && storedDadoUsuario.info) {
      setDadosUsuario(storedDadoUsuario);
      
      // A lógica de verificação e redirecionamento agora está aqui,
      // rodando apenas após os dados serem carregados no estado
      if (storedDadoUsuario.info.tipo !== 'admin') {
        router.push('/');
      }
    } else {
      // Se não houver dados, redireciona para a página inicial
      router.push('/');
    }
  }, [router]);
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Conteúdo principal */}
      <div className="flex-1 ml-64 bg-[#F4F4F5] p-6">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'orders' && <OrdersSection />}
        {activeSection === 'products' && <ProductsSection />}
        {activeSection === 'reports' && <ReportsSection />}
        {activeSection === 'addproduct' && <AddProductNew />}
      </div>
    </div>
  );
}
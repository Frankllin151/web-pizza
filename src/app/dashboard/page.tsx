"use client";
import { useState, useEffect } from 'react';
import Sidebar from '../componentes/Sidebar';
import { OverviewSection, OrdersSection, ProductsSection , ReportsSection, AddProductNew } from '../componentes/Sidebar';
import { useRouter } from 'next/navigation';

interface UserData {
  info: {
    tipo: string;
  };
}

export default function Dashboard() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [dadosUsuario, setDadosUsuario] = useState<UserData | null>(null);
 console.log(dadosUsuario);
 
  useEffect(() => {
    // 1. Pega o token do localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // Se não houver token, redireciona para a página de login
      router.push('/login.html');
      return; // Importante: para a execução
    }
    
    // 2. Pega os dados do usuário do localStorage
    const storedDadoUsuario = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedDadoUsuario || storedDadoUsuario.info.tipo !== 'admin') {
      // Se não houver dados ou o usuário não for admin, redireciona para a home
      router.push('/login.html');
      return; // Importante: para a execução
    }
 

    // 3. Se tudo estiver correto, atualiza os estados e para o loading
    setToken(storedToken);
    setDadosUsuario(storedDadoUsuario);
    setLoading(false);
    
  }, [router]);
 
  // Enquanto a verificação não estiver completa, exibe uma mensagem de carregamento

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
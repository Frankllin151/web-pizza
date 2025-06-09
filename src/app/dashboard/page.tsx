"use client";
import { useState } from 'react';
import Sidebar from '../componentes/Sidebar';
import { OverviewSection, OrdersSection, ProductsSection , ReportsSection, AddProductNew } from '../componentes/Sidebar';


export default function Dashboard() {
   const dadosUsuario = JSON.parse(localStorage.getItem('user') || '{}');


const token = localStorage.getItem('token');
console.log(token);


if(token === "" || !token){
   window.location.href = "/login";
}
if(dadosUsuario.info.tipo !== "admin"){
  window.location.href = "/";
}
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
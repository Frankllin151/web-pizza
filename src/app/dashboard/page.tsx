"use client";
import { useState } from 'react';
import Sidebar from '../componentes/Sidebar';
import { OverviewSection, OrdersSection, ProductsSection , ReportsSection, AddProductNew } from '../componentes/Sidebar';


export default function Dashboard() {
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
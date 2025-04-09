"use client"
import { useState } from 'react';
import Image from 'next/image';
import   pizzas  from '../data/produtopizza';
import  {Pedido , pedidos} from '../data/Pedidos';
import DeliveryStatus from '../componentes/DeliveryStatus';
import SalesReport from '../componentes/SalesReport';
import PizzaCard from '../componentes/PizzaCard';
import AddPizzaComponent from './AddProductPizza';
 export default function Sidebar({ 
    activeSection, 
    setActiveSection 
  }: { 
    activeSection: string;
    setActiveSection: (section: string) => void;
  }) {
    const menuItems = [
      { id: 'overview', label: 'Visão Geral', icon: '📊' },
      { id: 'orders', label: 'Pedidos', icon: '🛵' },
      { id: 'products', label: 'Produtos', icon: '🍕' },
      { id: 'reports', label: 'Relatórios', icon: '📈' },
      { id: "addproduct" , label: "Adicionar" , icon: "➕" }
    ];
  
    return (
      <div className="fixed left-0 top-0 h-screen w-64 bg-[#1A1A1D] text-white p-6">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-bold text-[#F97316]">Pizza Dashboard</h1>
        </div>
        
        <div className="space-y-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center w-full gap-3 p-3 rounded-md transition-all shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]
                ${activeSection === item.id ? 'bg-[#F97316] text-white' : 'hover:bg-gray-800'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // Seção de Visão Geral
 export function OverviewSection() {
    return (
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Visão Geral</h1>
          <div className="flex space-x-4">
            <button className="bg-[#F97316] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
              Novo Pedido
            </button>
          </div>
        </header>
        
        {/* Status de Entrega */}
        <DeliveryStatus pedidos={pedidos} />
        
        
      </div>
    );
  }
  
  // Seção de Pedidos
  export function OrdersSection() {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
        </header>
        
        <DeliveryStatus pedidos={pedidos} />
        
       
      </div>
    );
  }
  
  // Seção de Produtos
export  function ProductsSection() {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        </header>
        
        
        
        <div>
          <h2 className="text-xl font-bold mb-4">Catálogo de Pizzas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Seção de Relatórios
 export function ReportsSection() {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Relatórios de Vendas</h1>
        </header>
        
        <SalesReport pedidos={pedidos} />
        
        <div className="bg-white rounded-md shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)] p-6">
          <h2 className="text-xl font-bold mb-4">Exportar Relatórios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
              Exportar PDF
            </button>
            <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600">
              Exportar Excel
            </button>
            <button className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600">
              Enviar por E-mail
            </button>
          </div>
        </div>
      </div>
    );
  }

  export function AddProductNew()
  {

// Função de exemplo para lidar com o envio do formulário
const handleAddPizza = (pizzaData: any) => {
  console.log("Nova pizza adicionada:", pizzaData);
  alert("Nova pizza  adicionada")
  // Aqui você pode adicionar lógica para salvar a pizza, como uma chamada de API
};

    return(
         <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Adicionar Pizza</h1>
        </header>
        <AddPizzaComponent onSubmit={handleAddPizza} />
      </div>
    )
  }
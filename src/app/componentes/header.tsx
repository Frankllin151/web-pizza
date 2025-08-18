"use client"
import { useState, useEffect } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { Menu,X, ShoppingCart, User, UserPlus } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  onFiltroChange?: (valor: string) => void; // "?" => opcional
};

export default function Header({ onFiltroChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
const [filtro ,  SetFiltro] = useState("");
const token = JSON.parse(localStorage.getItem("token") || '""');

const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (onFiltroChange) {
    onFiltroChange(e.target.value);
  }
};


  // Detecta se a tela é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verifica no carregamento inicial
    checkMobile();
    
    // Adiciona listener para redimensionamento
    window.addEventListener("resize", checkMobile);
    
    // Limpa o listener quando o componente é desmontado
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fecha o menu quando muda de mobile para desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Alterna o estado do menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <h1 className="font-bold text-xl text-gray-800">
           <Link href="/">
           Web Pizza
           </Link>
          </h1>

          {/* Botão do menu hamburger (visível apenas em mobile) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden focus:outline-none"
            aria-label="Menu"
          >
           {isOpen ? (
    <X size={28} className="text-gray-800 transition-transform duration-300" />
  ) : (
    <Menu size={28} className="text-gray-800 transition-transform duration-300" />
  )}
          </button>

          {/* Barra de pesquisa (visível apenas em desktop) */}
          <div className="hidden md:block flex-1 mx-6">
            <TextInput
              type="text"
              onChange={handleFiltro}
              name="search"
              placeholder="Pesquisar pizzas..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Botões de navegação (visíveis apenas em desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {
              token ?(
<Link href="/minha-conta.html">
      <Button
        color="bg-black"
        className="px-4 py-2 text-white rounded-md flex items-center"
      >
        <User size={18} className="mr-1" />
        <span>Minha Conta</span>
      </Button>
    </Link>
              ) : (
                <>
<Link href="/login.html">
              <Button
                color="bg-orange-500"
                className="px-4 py-2 text-white rounded-md flex items-center"
              >
                <User size={18} className="mr-1" />
                <span>Entrar</span>
              </Button>
            </Link>
            <Link href="/register.html">
              <Button
                color="bg-gray-900"
                className="px-4 py-2 text-white rounded-md flex items-center"
              >
                <UserPlus size={18} className="mr-1" />
                <span>Registrar</span>
              </Button>
            </Link>
             </>
              )
            }
            
           <Link
           href="/carrinho.html"
           >
            <Button
              color="bg-orange-500"
              className="px-4 py-2 text-white rounded-md flex items-center"
            >
              <ShoppingCart size={18} className="mr-1" />
              <span>Carrinho</span>
            </Button>
           </Link>
          </div>
        </div>

        {/* Menu mobile (expande quando isOpen é true) */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            {/* Barra de pesquisa para mobile */}
            <div className="mb-4">
              <TextInput
              onChange={handleFiltro}
                type="text"
                name="search"
                placeholder="Pesquisar pizzas..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            {/* Botões para mobile */}
            <div className="flex flex-col space-y-2">
              { token ?(

<Link href="/minha-conta.html">
      <Button
        color="bg-black"
        className="px-4 py-2 text-white rounded-md flex items-center"
      >
        <User size={18} className="mr-1" />
        <span>Minha Conta</span>
      </Button>
    </Link>
              ) : (
                  <>
                <Link href="/login.html" className="w-full">
                <Button
                  color="bg-orange-500"
                  className="w-full px-4 py-2 text-white rounded-md flex items-center justify-center"
                >
                  <User size={18} className="mr-2" />
                  <span>Entrar</span>
                </Button>
              </Link>
              <Link href="/register.html" className="w-full">
              
                <Button
                  color="bg-gray-900"
                  className="w-full px-4 py-2 text-white rounded-md flex items-center justify-center"
                >
                  <UserPlus size={18} className="mr-2" />
                  <span>Registrar</span>
                </Button>
              </Link>
                  </>
                )
              }
             
              <Link
              href="/carrinho.html"
              >
<Button
                color="bg-orange-500"
                className="px-4 py-2 text-white rounded-md flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                <span>Carrinho</span>
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
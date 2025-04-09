import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#1A1A1D] text-white h-screen w-64 fixed left-0 top-0 p-6">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-2xl font-bold text-[#F97316]">Pizza Dashboard</h1>
      </div>
      
      <div className="space-y-6">
        <NavItem href="/" label="Produtos" icon="🍕" />
        <NavItem href="/pedidos" label="Pedidos" icon="🛵" />
        <NavItem href="/cadastro" label="Cadastrar" icon="➕" />
        <NavItem href="/relatorios" label="Relatórios" icon="📊" />
      </div>
    </nav>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition-all shadow-[0_4px_7px_-1px_rgba(0,0,0,0.11),0_2px_4px_-1px_rgba(0,0,0,0.07)]"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
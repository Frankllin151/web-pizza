'use client'
import { useState, useEffect } from 'react';
import { ItemCarrinho } from '../type/ItemCarrinho';
import Header from '../componentes/header';
import Link from 'next/link';
import Button from '../componentes/Button';
import { useRouter } from 'next/navigation';
import MinhaContaPerFil from '../componentes/minha-conta/minhaContaPerfil';
// Interfaces para tipagem
export default function MinhaConta() {


  
  return (
    <>
    <Header/>
    
   <MinhaContaPerFil/>
    </>
  );
}
import React, { useState } from 'react'

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="bg-purple-600 text-white py-4 shadow-md">
      <div className="w-full px-8 md:px-24 flex items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
            Açaí Tradicional
        </h1>

        {/* Menu desktop */}
        {/* <nav className="hidden sm:block">
          <ul className="flex gap-4 text-sm sm:text-base font-medium">
            <li className="hover:underline cursor-pointer">Cardápio</li>
            <li className="hover:underline cursor-pointer">Contato</li>
            <li className="hover:underline cursor-pointer">WhatsApp</li>
          </ul>
        </nav> */}

        {/* Ícone hamburguer mobile */}
        {/* <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button> */}
      </div>

      {/* Dropdown compacto e alinhado à direita */}
      {/* {menuAberto && (
        <nav className="sm:hidden flex justify-end px-4 mt-2">
          <ul className="w-fit bg-purple-700 px-4 py-2 rounded shadow-md text-sm font-medium space-y-2 text-start">
            <li className="hover:underline cursor-pointer">Cardápio</li>
            <li className="hover:underline cursor-pointer">Contato</li>
            <li className="hover:underline cursor-pointer">WhatsApp</li>
          </ul>
        </nav>
      )} */}
    </header>
  )
}

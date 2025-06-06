import React from "react";

export default function Carousel({ cardapioAcai, adicionar }) {
  return (
    <div className="p-4 font-sans">
      <div
        className="flex overflow-x-auto gap-4 sm:gap-6 py-6 px-2 scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cardapioAcai.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 flex flex-col"
            style={{
              minWidth: "300px",
              maxWidth: "300px",
              height: "500px", // garante altura consistente
              scrollSnapAlign: "start",
            }}
          >
            {/* Conteúdo principal */}
            <div>
              <div className="w-full aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={p.imagem}
                  alt={p.nome}
                  className="w-full h-full object-cover"
                  style={{ height: "300px" }}
                />
              </div>
              <h2 className="font-semibold text-purple-700 text-lg">{p.nome}</h2>
              <p className="text-gray-600 text-sm">{p.descricao || "Delicioso!"}</p>
            </div>

            {/* Preço e botão sempre na base */}
            <div className="mt-auto pt-4 flex justify-between items-center">
              <span className="text-purple-700 font-bold">R${p.preco}</span>
              <button
                onClick={() => adicionar(p)}
                className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

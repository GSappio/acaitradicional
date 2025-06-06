// src/components/ComplementoModal.js
import React, { useState } from "react";
import extrasMock from "../mocks/AcompanhamentosExtras";

export default function ComplementoModal({ produto, onClose, onConfirm }) {
  const [frutas, setFrutas] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [extras, setExtras] = useState([]);

  const frutasMax = 2;
  const acompanhamentosMax = 3;

  const handleToggle = (value, list, setList, max) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else if (list.length < max) {
      setList([...list, value]);
    }
  };

  const toggleExtra = (extra) => {
    if (extras.some((e) => e.id === extra.id)) {
      setExtras(extras.filter((e) => e.id !== extra.id));
    } else {
      setExtras([...extras, extra]);
    }
  };

  const totalExtras = extras.reduce((sum, e) => sum + e.preco, 0);

  const confirmar = () => {
    onConfirm({
      ...produto,
      frutas,
      acompanhamentos,
      extras,
      preco: produto.preco + totalExtras,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-purple-700">{produto.nome}</h2>

        <div className="mb-4">
          <p className="font-semibold mb-2">Escolha até {frutasMax} frutas:</p>
          {["Morango", "Banana", "Kiwi", "Uva", "Manga"].map((fruta) => (
            <label key={fruta} className="block">
              <input
                type="checkbox"
                checked={frutas.includes(fruta)}
                onChange={() => handleToggle(fruta, frutas, setFrutas, frutasMax)}
              />
              <span className="ml-2">{fruta}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Escolha até {acompanhamentosMax} acompanhamentos:</p>
          {["Granola", "Mel", "Leite em pó", "Paçoca", "Calda de morango"].map((ac) => (
            <label key={ac} className="block">
              <input
                type="checkbox"
                checked={acompanhamentos.includes(ac)}
                onChange={() =>
                  handleToggle(ac, acompanhamentos, setAcompanhamentos, acompanhamentosMax)
                }
              />
              <span className="ml-2">{ac}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Extras (opcional):</p>
          {extrasMock.map((extra) => (
            <label key={extra.id} className="block">
              <input
                type="checkbox"
                checked={extras.some((e) => e.id === extra.id)}
                onChange={() => toggleExtra(extra)}
              />
              <span className="ml-2">{extra.nome} (+R${extra.preco.toFixed(2)})</span>
            </label>
          ))}
        </div>

        <div className="flex gap-1">
          <p className="font-semibold mb-2">Total:</p><p>R$</p>{(produto.preco + totalExtras).toFixed(2)}
        </div>

        <div className="flex justify-between items-center mt-6 gap-6">
          <button onClick={onClose} className="flex w-full justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Cancelar
          </button>
          <button
            onClick={confirmar}
            className="flex w-full justify-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

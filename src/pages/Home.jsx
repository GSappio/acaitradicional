import { useState } from "react";
import { Header } from "../components/Header";
import AcaiTradicional from "../mocks/Produtos";
import AcaiTrufado from "../mocks/AcaiTrufado";
import VitaminaAcai from "../mocks/Vitamina";
import ComplementosModal from "../components/ComplementosModal";

function Home() {
    const [carrinho, setCarrinho] = useState([]);
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [pagamento, setPagamento] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const abrirModal = (produto) => {
        setProdutoSelecionado(produto);
        setModalAberto(true);
    };

    const adicionarComComplementos = (produtoComExtras) => {
        setCarrinho([...carrinho, produtoComExtras]);
        setModalAberto(false);
        setProdutoSelecionado(null);
    };

    const removerItem = (index) => {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);
        setCarrinho(novoCarrinho);
    };

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

    const finalizarPedido = () => {
        const lista = carrinho
            .map(
                (item) =>
                    `- ${item.nome}\n  Frutas: ${item.frutas?.join(", ") || "Nenhuma"}\n  Acompanhamentos: ${item.acompanhamentos?.join(", ") || "Nenhum"}`
            )
            .join("\n\n");

        const mensagem = encodeURIComponent(
            `🍧 Pedido de Açaí:\n${lista}\n\nTotal: R$${total.toFixed(2)}\n\nNome: ${nome}\nEndereço: ${endereco}\nBairro: ${bairro}\nPagamento: ${pagamento}`
        );

        const numero = "5511967759989";
        window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
    };

    const isFormValido = nome && endereco && bairro && pagamento && carrinho.length > 0;

    return (
        <>
            <Header />

            <div className="p-4 mt-6 md:mx-20 space-y-8 min-h-screen">
                <h1 className="text-2xl font-bold text-purple-700">Açaí Tradicional</h1>

                {AcaiTradicional.map((produto, i) => (
                    <div
                        key={i}
                        onClick={() => abrirModal(produto)}
                        className="flex justify-between gap-4 border-b pb-4 cursor-pointer hover:bg-purple-50 transition rounded p-2"
                    >
                        <div className="flex-1">
                            {produto.destaque && (
                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs inline-block mb-1">
                                    🔥 O mais pedido
                                </span>
                            )}
                            <h3 className="text-lg font-semibold">{produto.nome}</h3>
                            <div className="text-sm text-gray-600">{produto.descricao}</div>
                            <p className="text-base font-bold mt-1">R$ {produto.preco.toFixed(2)}</p>
                        </div>
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                ))}

                <h1 className="text-2xl font-bold text-purple-700">Açaí Trufado</h1>

                {AcaiTrufado.map((produto, i) => (
                    <div
                        key={i}
                        onClick={() => abrirModal(produto)}
                        className="flex justify-between gap-4 border-b pb-4 cursor-pointer hover:bg-purple-50 transition rounded p-2"
                    >
                        <div className="flex-1">
                            {produto.destaque && (
                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs inline-block mb-1">
                                    🔥 O mais pedido
                                </span>
                            )}
                            <h3 className="text-lg font-semibold">{produto.nome}</h3>
                            <div className="text-sm text-gray-600">{produto.descricao}</div>
                            <p className="text-base font-bold mt-1">R$ {produto.preco.toFixed(2)}</p>
                        </div>
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                ))}

                <h1 className="text-2xl font-bold text-purple-700">Vitaminas</h1>

                {VitaminaAcai.map((produto, i) => (
                    <div
                        key={i}
                        onClick={() => abrirModal(produto)}
                        className="flex justify-between gap-4 border-b pb-4 cursor-pointer hover:bg-purple-50 transition rounded p-2"
                    >
                        <div className="flex-1">
                            {produto.destaque && (
                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs inline-block mb-1">
                                    🔥 O mais pedido
                                </span>
                            )}
                            <h3 className="text-lg font-semibold">{produto.nome}</h3>
                            <div className="text-sm text-gray-600">{produto.descricao}</div>
                            <p className="text-base font-bold mt-1">R$ {produto.preco.toFixed(2)}</p>
                        </div>
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                ))}

                {/* Carrinho */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🛒 Carrinho</h2>
                    <ul className="mb-4">
                        {carrinho.map((item, i) => (
                            <li key={i} className="border-b py-2 flex justify-between items-center">
                                <span>
                                    {item.nome} - R${item.preco.toFixed(2)}
                                    <div className="text-sm text-gray-600">
                                        {item.frutas?.length > 0 && <div>Frutas: {item.frutas.join(", ")}</div>}
                                        {item.acompanhamentos?.length > 0 && <div>Acompanhamentos: {item.acompanhamentos.join(", ")}</div>}
                                        {item.extras?.length > 0 && <div>Extras: {item.extras.map(e => e.nome).join(", ")}</div>}
                                    </div>
                                </span>
                                <button
                                    onClick={() => removerItem(i)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold mb-4">Total: R${total.toFixed(2)}</p>
                </div>

                {/* Formulário */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Endereço"
                        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Bairro"
                        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    />
                    <select
                        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={pagamento}
                        onChange={(e) => setPagamento(e.target.value)}
                    >
                        <option value="">Forma de pagamento</option>
                        <option value="Cartão Crédito">Cartão Crédito</option>
                        <option value="Cartão Débito">Cartão Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Pix">Pix</option>
                    </select>
                </div>

                <button
                    onClick={finalizarPedido}
                    disabled={!isFormValido}
                    className={`p-3 w-full rounded-xl font-bold text-white transition 
            ${isFormValido ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Finalizar Pedido no WhatsApp
                </button>
            </div>

            {modalAberto && produtoSelecionado && (
                <ComplementosModal
                    produto={produtoSelecionado}
                    onClose={() => setModalAberto(false)}
                    onConfirm={adicionarComComplementos}
                />
            )}
        </>
    );
}

export default Home;

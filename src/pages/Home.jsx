import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import cardapioAcai from "../mocks/Produtos";
import Carousel from "../components/Carousel";
import ComplementosModal from "../components/ComplementosModal";
import AlertModal from "../components/AlertModal";

function Home() {
    const [carrinho, setCarrinho] = useState([]);
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [pagamento, setPagamento] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

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

    // Desabilitar scroll quando o modal de alerta estiver aberto
    useEffect(() => {
        if (mostrarAlerta) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup para caso o componente desmonte com modal aberto
        return () => {
            document.body.style.overflow = "";
        };
    }, [mostrarAlerta]);

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

    const finalizarPedido = () => {
        const lista = carrinho
            .map(
                (item) =>
                    `- ${item.nome}\n  Frutas: ${item.frutas?.join(", ") || "Nenhuma"}\n  Acompanhamentos: ${item.acompanhamentos?.join(", ") || "Nenhum"}`
            )
            .join("\n\n");

        const mensagem = encodeURIComponent(
            `🍧 Pedido de Açaí:\n${lista}\n\nTotal: R$${total},00\n\nNome: ${nome}\nEndereço: ${endereco}\nBairro: ${bairro}\nPagamento: ${pagamento}`
        );

        const numero = "5511967759989";
        window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
    };

    return (
        <>
            <Header />
            <div className="mx-4 md:mx-20 font-sans mt-6">
                <h1 className="text-2xl font-bold pl-4 pt-4">Faça seu Pedido!</h1>
                <Carousel cardapioAcai={cardapioAcai} adicionar={abrirModal} />

                <h2 className="text-xl font-semibold mb-2">🛒 Carrinho</h2>
                <ul className="mb-4">
                    {carrinho.map((item, i) => (
                        <li key={i} className="border-b py-2 flex justify-between items-center">
                            <span>
                                {item.nome} - R${item.preco.toFixed(2)}
                                {item.frutas?.length || item.acompanhamentos?.length || item.extras?.length ? (
                                    <div className="text-sm text-gray-600">
                                        {item.frutas?.length > 0 && <div>Frutas: {item.frutas.join(", ")}</div>}
                                        {item.acompanhamentos?.length > 0 && <div>Acompanhamentos: {item.acompanhamentos.join(", ")}</div>}
                                        {item.extras?.length > 0 && <div>Extras: {item.extras.map(e => e.nome).join(", ")}</div>}
                                    </div>
                                ) : null}
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


                <p className="font-bold mb-4">Total: R${total}</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Informações de Entrega</h2>

                <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full mb-2 p-2 rounded border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    className="w-full mb-2 p-2 rounded border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    className="w-full mb-2 p-2 rounded border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />

                <select
                    className="w-full mb-4 p-2 rounded border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    value={pagamento}
                    onChange={(e) => setPagamento(e.target.value)}
                >
                    <option value="">Selecione a forma de pagamento</option>
                    <option value="Cartão Crédito">Cartão Crédito</option>
                    <option value="Débito">Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">Pix</option>
                </select>

                <button
                    onClick={() => {
                        if (
                            carrinho.length === 0 ||
                            !nome.trim() ||
                            !endereco.trim() ||
                            !bairro.trim() ||
                            !pagamento.trim()
                        ) {
                            setMostrarAlerta(true);
                            return;
                        }
                        finalizarPedido();
                    }}
                    className={`p-3 rounded-xl w-full font-bold text-white mb-4 ${carrinho.length === 0 ||
                            !nome.trim() ||
                            !endereco.trim() ||
                            !bairro.trim() ||
                            !pagamento.trim()
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    Finalizar Pedido no WhatsApp
                </button>

                {mostrarAlerta && (
                    <AlertModal
                        mensagem="Adicione um item ao carrinho, preencha as informações de entrega e pagamento."
                        onClose={() => setMostrarAlerta(false)} // fecha o modal
                    />
                )}
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

import imageAcai from '../assets/img/acai.jpg'

const AcaiTradicional = [
  {
    id: 1,
    nome: "Açaí Tradicional Premium 330ml",
    preco: 10,
    descricao: (
      <>Açaí premium com <strong>80% de polpa pura</strong>, 2 frutas frescas e 3 acompanhamentos deliciosos. Refresque-se com o melhor sabor e qualidade!</>
    ),
    imagem: imageAcai,
  },
  {
    id: 2,
    nome: "Açaí Tradicional Premium 550ml",
    preco: 15,
    destaque: false, // 🔥 Destaque
    descricao: (
      <>Açaí premium com <strong>80% de polpa pura</strong>, 2 frutas frescas e 3 acompanhamentos deliciosos. Perfeito para quem quer uma dose extra de sabor e energia!</>
    ),
    imagem: imageAcai,
  },
  {
    id: 3,
    nome: "Açaí Tradicional Premium 770ml",
    preco: 20,
    descricao: (
      <>Açaí premium com <strong>80% de polpa pura</strong>, 2 frutas frescas e 3 acompanhamentos deliciosos. A escolha certa para matar a fome e se refrescar de verdade!</>
    ),
    imagem: imageAcai,
  },
]

export default AcaiTradicional;

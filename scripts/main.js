class Items {
	constructor(nome, imagem, descricao, preco) {
		this.nome = nome;
		this.imagem = `../img/${imagem}.png`;
		this.descricao = descricao;
		this.preco = preco;
	}

	getView(select) {
		const view = document.createElement("div");
		view.classList.add("opcao");
		view.addEventListener("click", () => {
			select(view, this.nome, this.preco);
		});
		view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

		return view;
	}
}

let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

const pratos = [
	new Items(
		"Estrombelete de Frango",
		"frango_yin_yang",
		"Um pouco de batata, um pouco de salada",
		14.9
	),
	new Items("Asa de Boi", "frango_yin_yang", "Com molho shoyu", 14.9),
	new Items(
		"Carne de Monstro",
		"frango_yin_yang",
		"Com batata assada e farofa",
		14.9
	),
];

const bebidas = [
	new Items("Coquinha gelada", "coquinha_gelada", "Lata 350ml", 4.9),
	new Items("Caldo de Cana", "coquinha_gelada", "Copo 600ml", 4.9),
	new Items("Corote Gelado", "coquinha_gelada", "Garrafa 400ml", 4.9),
];

const sobremesas = [
	new Items("Pudim", "pudim", "Gosto de doce de leite", 7.9),
	new Items("Flam", "pudim", "Gosto de chocolate", 7.9),
	new Items("Brigadeiro", "pudim", "3 unidades", 7.9),
];

function selecionarPrato(elemento, { nome, preco }) {
	const selecionado = document.querySelector(".prato .selecionado");
	if (selecionado !== null) {
		selecionado.classList.remove("selecionado");
	}
	elemento.classList.add("selecionado");

	pratoSelecionado = {
		nome,
		preco,
	};
	verificarPedido();
}

function selecionarBebida(elemento, { nome, preco }) {
	const selecionado = document.querySelector(".bebida .selecionado");
	if (selecionado !== null) {
		selecionado.classList.remove("selecionado");
	}
	elemento.classList.add("selecionado");

	bebidaSelecionada = { nome, preco };
	verificarPedido();
}

function selecionarSobremesa(elemento, { nome, preco }) {
	const selecionado = document.querySelector(".sobremesa .selecionado");
	if (selecionado !== null) {
		selecionado.classList.remove("selecionado");
	}
	elemento.classList.add("selecionado");

	sobremesaSelecionada = { nome, preco };
	verificarPedido();
}

function getPrecoTotal() {
	return (
		pratoSelecionado.preco +
		bebidaSelecionada.preco +
		sobremesaSelecionada.preco
	);
}

function confirmarPedido() {
	const modal = document.querySelector(".overlay");
	modal.classList.remove("escondido");

	document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
		pratoSelecionado.nome;
	document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
		pratoSelecionado.preco.toFixed(2);

	document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
		bebidaSelecionada.nome;
	document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
		bebidaSelecionada.preco.toFixed(2);

	document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
		sobremesaSelecionada.nome;
	document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
		sobremesaSelecionada.preco.toFixed(2);

	document.querySelector(".confirmar-pedido .total .preco").innerHTML =
		getPrecoTotal().toFixed(2);
}

function cancelarPedido() {
	const modal = document.querySelector(".overlay");
	modal.classList.add("escondido");
}

function enviarZap() {
	const telefoneRestaurante = 553299999999;
	const encodedText = encodeURIComponent(
		`Olá, gostaria de fazer o pedido: \n- Prato: ${
			pratoSelecionado.nome
		} \n- Bebida: ${bebidaSelecionada.nome} \n- Sobremesa: ${
			sobremesaSelecionada.nome
		} \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
	);

	const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
	window.open(urlWhatsapp);
}

function verificarPedido() {
	if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
		btnPedir.classList.add("ativo");
		btnPedir.disabled = false;
		btnPedir.innerHTML = "Fazer pedido";
	}
}

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) =>
	pratosContainer.appendChild(prato.getView(selecionarPrato))
);

const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) =>
	bebidasContainer.appendChild(bebida.getView(selecionarBebida))
);

const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) =>
	sobremesasContainer.appendChild(sobremesa.getView(selecionarSobremesa))
);

btnConfirmar.addEventListener("click", () => {
	enviarZap();
});

btnCancelar.addEventListener("click", () => {
	cancelarPedido();
});

btnPedir.addEventListener("click", () => {
	confirmarPedido();
});

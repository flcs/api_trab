import { Request, Response } from "express";
import { Produto } from "../entities/produto";
import { ProdutoController } from "../controller/produto_controller";
import { ProdutoUseCase } from "../useCases/produto_use_case";
import { Repository } from "../repositories/repository";

jest.resetModules();

// Criando um mock do ProdutoUseCase
const produtoUseCaseMock = {
  // repo: {
  //   create: jest.fn(),
  //   findById: jest.fn(),
  //   updateById: jest.fn(),
  //   deleteById: jest.fn(),
  // },
  obterProduto: jest.fn(),
  createProduto: jest.fn(),
  repo: {} as Repository<Produto>
};

// Criando um mock da Request e Response do Express
const req = {
  query: { id: '1' }
} as any;

const res : jest.Mocked<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
} as any;

const produto: Produto = {
  id: "1",
  nome: "Produto 1",
  descricao: "Descricao 1",
  preco: 10
};

describe("ProdutoController", () => {
  let controller: ProdutoController;

  beforeEach(() => {
    jest.clearAllMocks();
    // Inicializando o controller com o mock do ProdutoUseCase
    controller = new ProdutoController(produtoUseCaseMock as ProdutoUseCase);
  });

  describe("getProduto", () => {

    it("deve retornar um erro 404 se o produto não for encontrado", async () => {
      // Criando um mock da Request e Response do Express
      const req = {} as Request;

      console.log("esperando undefined 404")

      // Configurando o mock do ProdutoUseCase para retornar undefined
      produtoUseCaseMock.obterProduto.mockResolvedValueOnce(undefined);

      // Chamando o método getProduto do controller
      await controller.getProduto({} as Request, res);

      // Verificando se o status da resposta foi 404
      expect(res.status).toHaveBeenCalledWith(404);

      // Verificando se o método json da resposta foi chamado com o objeto { erro: "Produto não encontrado" }
      expect(res.json).toHaveBeenCalledWith({ erro: "Produto não encontrado" });

      // Verificando se o método end da resposta foi chamado
      expect(res.end).toHaveBeenCalled();
    });
    
    it("deve retornar um produto com sucesso", async () => {
      jest.clearAllMocks()
      // Configurando o mock do ProdutoUseCase para retornar um produto
      produtoUseCaseMock.obterProduto.mockResolvedValueOnce(produto);

      // Chamando o método getProduto do controller
      await controller.getProduto(req, res);

      // Verificando se o status da resposta foi 200
      expect(res.status).toHaveBeenCalledWith(200);

      // Verificando se o método json da resposta foi chamado com o produto retornado pelo ProdutoUseCase
      expect(res.json).toHaveBeenCalledWith(produto);

      // Verificando se o método end da resposta foi chamado
      expect(res.end).toHaveBeenCalled();
    });

  });
});

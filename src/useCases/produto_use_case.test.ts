// import { jest } from '@jest/globals';

import { Request, Response } from "express";
import { Produto } from "../entities/produto";
import { Repository } from "../repositories/repository";
import { ProdutoUseCase } from "../useCases/produto_use_case";
import { ProdutoController } from "../controller/produto_controller";

// import { mocked } from 'ts-jest/utils';


let mockProduto = {
    id: "1",
    nome: "Produto 1",
    descricao: "Descrição do produto 1",
    preco: 10.00
} as Produto;


jest.mock("../repositories/repository", () => {
    return {
        Repository: jest.fn().mockImplementation(() => {
            return {
                create: jest.fn().mockResolvedValue(mockProduto),
                findById: jest.fn().mockResolvedValue(mockProduto),
                updateById: jest.fn().mockResolvedValue(true),
                deleteById: jest.fn().mockResolvedValue(true)
            }
        })
    }
});
const MockedRepo = Repository as jest.Mocked<typeof Repository>;


jest.mock("../useCases/produto_use_case", () => {
    return {
        ProdutoUseCase: jest.fn().mockImplementation(() => {
            return {
                createProduto: jest.fn().mockResolvedValue(mockProduto),
                obterProduto: jest.fn().mockResolvedValue(mockProduto)
            }
        })
    }
});
const MockedUseCase = ProdutoUseCase as jest.Mocked<typeof ProdutoUseCase>;


jest.mock("../repositories/repository", () => {
    return {
        Repository: jest.fn().mockImplementation(() => {
            return {
                create: jest.fn().mockResolvedValue(mockProduto),
                findOne: jest.fn().mockResolvedValue(mockProduto),
                updateById: jest.fn().mockResolvedValue(true),
                deleteById: jest.fn().mockResolvedValue(true)
            }
        })
    }
});
const MockedController = ProdutoController as jest.Mocked<typeof ProdutoController>;





describe('ProdutoUseCase', () => {
    test('should be able to use useCase to create a new Product', async () => {
        const repo = new Repository<Produto>();
        const useCase = new ProdutoUseCase(repo);

        const produto = {
            nome: "Produto 1",
            descricao: "Descrição do produto 1",
            preco: 10.00
        } as Partial<Produto>

        const novoProduto = await useCase.createProduto(produto)
        expect(novoProduto!.id).toBe("1");
    });



    test('should be able to use controller to create a new Product', async () => {
        const req: Partial<Request> = {
            body: {
                nome: "Produto 1",
                descricao: "Descrição do produto 1",
                preco: 10.00
            }
        };
        const resp = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis()
        } as Partial<Response>;

        
        // const repo = new Repository<Produto>();
        // const useCase = new ProdutoUseCase(repo);
        // const controller = new ProdutoController(useCase);

        const mockedRepo = new MockedRepo<Produto>();
        const mockedUseCase = new MockedUseCase(mockedRepo);
        // const mockedController = new MockedController(mockedUseCase);

        const novoProduto = await mockedUseCase.createProduto(mockProduto)

        expect(novoProduto!.id).toBe("1");
    });

});


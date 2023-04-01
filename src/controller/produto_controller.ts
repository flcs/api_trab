import { Request, Response } from "express";
import { Produto } from "../entities/produto";
import { ProdutoUseCase } from "../useCases/produto_use_case";

export class ProdutoController {
    useCase: ProdutoUseCase

    constructor(useCase: ProdutoUseCase) {
        this.useCase = useCase;
    }

    async createProduto(req: Request, res: Response) {
        const { nome, preco, descricao } = req.body;
        const produto = {
            nome, descricao, preco
        } as Partial<Produto>
        this.useCase.createProduto(produto);
        res.status(200).json(produto).end();
    }

    async getProduto(req: Request, res: Response) {
        if (!req.query || !req.query.id) {
            res.status(404)
                .json({ erro: "Produto não encontrado" })
                .end();
            return;
        }

        const { id } = req.query;
        const produto = await this.useCase.obterProduto(id as string);
        if (!produto) {
            res.status(404)
                .json({ erro: "Produto não encontrado" })
                .end();
        } else {
            res.status(200).json(produto).end();
        }
    }

}
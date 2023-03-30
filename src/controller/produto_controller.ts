import { Request, Response } from "express";
import { Produto } from "../entities/produto";
import { ProdutoUseCase } from "../useCases/produto_use_case";

export class ProdutoController{

    useCase:ProdutoUseCase
    constructor (useCase:ProdutoUseCase){
        this.useCase = useCase;
    }

    async createProduto(req: Request, res:Response){
        const {nome, preco, descricao} = req.body;
        const produto = {
            nome, descricao, preco 
        } as Partial<Produto>
        
        console.log("Produto: ", produto)

        this.useCase.createProduto(produto);
        res.status(200).json(produto).end();
    }

    async getProduto(req: Request, res:Response){
        const {id} = req.query;
        console.log("id: ", id);
        const produto = this.useCase.obterProduto(id as string);
        res.status(200).json(produto).end();
    }

}
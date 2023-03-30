import { Produto } from "../entities/produto";
import { Repository } from "../repositories/repository";

export class ProdutoUseCase{
    repo:Repository<Produto>

    constructor (repo:Repository<Produto>){
        this.repo = repo;
    }

    async obterProduto(id: string):Promise<Produto | undefined>{
        const produto = await this.repo.findById(id);
        return produto;
    }

    async createProduto(produto: Partial<Produto>):Promise<Produto | undefined>{
        const novo_produto = await this.repo.create(produto);
        return novo_produto;
    }
}
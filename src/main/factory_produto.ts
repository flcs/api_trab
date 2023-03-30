import { ProdutoController } from "../controller/produto_controller";
import { Produto } from "../entities/produto";
import { Repository } from "../repositories/repository";
import { ProdutoUseCase } from "../useCases/produto_use_case";

function factoryProduto(){
    const repo = new Repository<Produto>();
    const useCase = new ProdutoUseCase(repo);
    const controller = new ProdutoController(useCase);

    return controller;

}

export default factoryProduto;
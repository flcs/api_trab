import {Router} from 'express'
import factoryProduto from './main/factory_produto';

const routes = Router();
const produtoController = factoryProduto();
routes.get("/api/produto",produtoController.getProduto)
routes.post("/api/produto",produtoController.createProduto)

export {routes};
import { Router } from 'express'
import { factoryControllerProduto } from './main/factory_Controller_produto';

const controllerProduto = factoryControllerProduto();
const routes = Router();
routes.get("/api/produto", controllerProduto.getProduto.bind(controllerProduto))
routes.post("/api/produto", controllerProduto.createProduto.bind(controllerProduto))

export { routes };

export class Repository<Entidade extends { id: string }>{
    lista:Entidade[] = [];

    private find(id:string):number{ 
        const obj = this.lista.findIndex(item => item.id === id)
        return obj;
    }

    async findById(id:string):Promise<Entidade | undefined>{ 
        const index = this.find(id);
        if(index <0 ) return undefined;
        const obj = await this.lista[index]
        return obj;
    }

    async updateById(id:string, atualizacao:Entidade):Promise<boolean>{ 
        const index = await this.find(id);
        if(index <0 ) return false;
        this.lista[index] = atualizacao;
        return true;
    }
    
    async create(novo:Partial<Entidade>):Promise<Entidade>{ 
        const id= this.lista.length.toString();
        const objeto_novo = {
            ...novo, id
        } as Entidade
        this.lista.push(objeto_novo);
        return objeto_novo;
    }

    async deleteById(id: string):Promise<boolean>{ 
        const index = await this.find(id);
        if(index <0 ) return false;
        this.lista.splice(index);
        return true;
    }

   
}
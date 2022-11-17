import { ToDo } from './models/todoes.model';
import { ToDoesRepository } from './models/todoes.repository';

export class ToDoesUsesCases {

    constructor(private repository: ToDoesRepository) {
    }
    async getAllToDoes(): Promise<ToDo[] | undefined> {
        return await this.repository.getToDoes();
    }

    async getToDo(id: string): Promise<ToDo | undefined> {
        return await this.repository.getToDo(id);
    }

    async createToDo(toDo: ToDo) {
        
        return await this.repository.createOrUpdateToDo(toDo);
        
    }

    async updateToDo(toDo: ToDo) {
        const toDoExist = await this.repository.getToDo(toDo.id);
        if (toDoExist) {
            return await this.repository.createOrUpdateToDo(toDo);
        } else {
            return false;
        }
    }

    async deleteToDo(id: string) {
        const toDoExist = await this.repository.getToDo(id);
        if (toDoExist) {
            return await this.repository.deleteToDo(id);
        } else {
            return false;
        }
    }
}
import { ToDo } from './todoes.model';

export interface ToDoesRepository {
    getToDoes():                                   Promise<ToDo[] | undefined>;
    getToDo(id: string):                           Promise<ToDo | undefined>;
    createOrUpdateToDo(id: ToDo):                  Promise<string>;
    deleteToDo(id: string):                        Promise<boolean>;
}
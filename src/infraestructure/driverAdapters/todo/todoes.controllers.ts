import { Request, Response } from "express";
import { ToDoesUsesCases } from "../../../domain/todo/todoes.usescases";
import { ToDoesDb } from '../../dbConnection/clientsDb';
const toDoesTable = new ToDoesUsesCases(new ToDoesDb('IrisTask'));

export async function getToDoesController(req: Request, res: Response) {
    try {
        const toDoesResponse = await toDoesTable.getAllToDoes();
        if (toDoesResponse?.length) {
            return res.json({
                toDoes: toDoesResponse
            });
        }
        else {
            return res.status(204).json();
        }
    } catch (error) {
        return res.status(500).json({
            code: 'db-0001',
            description: 'Sistema no disponible en este momento',
            technicalError: 'Error de conexion con la base de datos'
        });
    }
}

export async function getToDoController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const toDoResponse = await toDoesTable.getToDo(id);
        if (toDoResponse) {
            return res.json({
                client: toDoResponse
            });
        } else {
            return res.status(204).json();
        }
    } catch (error) {
        console.error('Error de conexion con la base de datos');
        return res.status(500).json({
            code: 'db-0002',
            description: 'Sistema no disponible en este momento',
            technicalError: 'Error de conexion con la base de datos'
        });
    }
}

export async function postToDoController(req: Request, res: Response) {
    const { body } = req;
    try {
        const idTodo = await toDoesTable.createToDo(body);
        if (idTodo) {
            return res.status(200).json({
                description: 'toDo creado exisotamente',
                id: idTodo
            });
        } else {
            console.info('Error creando toDo');
            return res.status(204).json();
        }
    } catch (error) {
        console.error('Error de conexion con la base de datos');
        return res.status(500).json({
            code: 'db-0003',
            description: 'Sistema no disponible en este momento',
            technicalError: 'Error de conexion con la base de datos'
        });
    }
}

export async function putToDoController(req: Request, res: Response) {
    const { body } = req;
    try {
        const isUpdateToDo = await toDoesTable.updateToDo(body);
        if (isUpdateToDo) {
            return res.status(200).json({
                description: 'toDo actulizado exisotamente',
                body
            });
        } else {
            console.info('toDo no actulizado');
            return res.status(204).json();
        }
    } catch (error) {
        console.error('Error de conexion con la base de datos');
        return res.status(500).json({
            code: 'db-0004',
            description: 'Sistema no disponible en este momento',
            technicalError: 'Error de conexion con la base de datos'
        });
    }
}

export async function deleteToDoController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const isDeleted = await toDoesTable.deleteToDo(id);
        if (isDeleted) {
            return res.status(200).json({
                description: 'Su toDo fue eliminado exitosamente'
            });
        } else {
            console.info('Error eliminando toDo');
            return res.status(204).json();
        }
    } catch (error) {
        console.error('Error de conexion con la base de datos');
        return res.status(500).json({
            code: 'db-0005',
            description: 'Sistema no disponible en este momento',
            technicalError: 'Error de conexion con la base de datos'
        });
    }
}
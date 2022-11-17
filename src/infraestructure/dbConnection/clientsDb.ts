import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ToDo } from '../../domain/todo/models/todoes.model';
import { ToDoesRepository } from '../../domain/todo/models/todoes.repository';

export class ToDoesDb implements ToDoesRepository {

  public dynamoToDo: AWS.DynamoDB.DocumentClient;

  constructor(public tableName: string) {
    this.dbConnection();
    this.dynamoToDo = new AWS.DynamoDB.DocumentClient();
  }

  async getToDoes(): Promise<ToDo[] | undefined> {
    const params = {
      TableName: this.tableName,
    }
    try {
      const toDoes: ToDo[] = (await this.dynamoToDo.scan(params).promise()).Items as ToDo[];
      return toDoes;
    } catch (error) {
      console.error('Error getToDoes =>', error);
      throw new Error('Error base de datos');
    }
  }

  async getToDo(id: string): Promise<ToDo | undefined> {
    const params = {
      TableName: this.tableName,
      Key: {
        id
      }
    }
    try {
      const toDo: ToDo = (await this.dynamoToDo.get(params).promise()).Item as ToDo;
      return toDo;
    } catch (error) {
      console.error('Error getToDo =>', error);
      throw new Error('Error base de datos');
    }
  }

  async createOrUpdateToDo(toDo: ToDo): Promise<boolean> {
    if(!toDo.id){
      toDo.id = uuidv4();
    }
    const params = {
      TableName: this.tableName,
      Item: toDo
    }
    try {
      await this.dynamoToDo.put(params).promise();
      return true;
    } catch (error) {
      console.error('Error createOrUpdateToDo =>', error);
      throw new Error('Error base de datos');
    }
  }

  async deleteToDo(id: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: {
        id
      },
    }
    try {
      await this.dynamoToDo.delete(params).promise()
      return true;
    } catch (error) {
      console.error('Error deleteToDo =>', error);
      throw new Error('Error base de datos');
    }
  }

  dbConnection() {
    AWS.config.update({
      region: "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}

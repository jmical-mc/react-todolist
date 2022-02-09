import { toDoItemsApiUrl } from "./routes";
import * as api from './api'

export const getAll = () => 
    api.get(toDoItemsApiUrl());

export const get = id =>
    api.get(toDoItemsApiUrl(id));

export const create = params =>
    api.post(toDoItemsApiUrl(), { todo_item: { ...params } })
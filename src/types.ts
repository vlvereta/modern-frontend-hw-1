export enum TodoPriority {
	High = "High",
	Medium = "Medium",
	Low = "Low",
}

export interface Todo {
	id: number;
	user_id: number;
	name: string;
	description: string;
	until: string;
	priority: TodoPriority;
	finished: boolean;
}

export interface CreateTodoRequestPayload {
	name: string;
	description: string;
	until: string;
	priority: TodoPriority;
	user_id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTodoRequestPayload extends CreateTodoRequestPayload {}

import React from "react";
import { addTodo } from "@/actions";

const AddTodoRow: React.FC = () => (
	<form className="mt-4 flex space-x-2" action={addTodo}>
		<div className="flex flex-col mb-2">
			<label htmlFor="name" className="mb-1">
				Name
			</label>
			<input type="text" id="name" name="name" className="border p-2" />
		</div>
		<div className="flex flex-col mb-2">
			<label htmlFor="description" className="mb-1">
				Description
			</label>
			<input
				type="text"
				id="description"
				name="description"
				className="border p-2"
				defaultValue="Temp value!!!"
			/>
		</div>
		<div className="flex flex-col mb-2">
			<label htmlFor="deadline" className="mb-1">
				Deadline
			</label>
			<input type="date" id="deadline" name="deadline" className="border p-2" />
		</div>
		<div className="flex flex-col mb-2">
			<label htmlFor="priority" className="mb-1">
				Priority
			</label>
			<select id="priority" name="priority" className="border p-2">
				<option value="High">High</option>
				<option value="Medium">Medium</option>
				<option value="Low">Low</option>
			</select>
		</div>
		<button type="submit" className="bg-blue-500 text-white p-2 mt-2">
			Add Todo
		</button>
	</form>
);

export default AddTodoRow;

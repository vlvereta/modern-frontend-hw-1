import { Todo, TodoPriority } from "@/types";
import React from "react";

interface TodoFormRowProps {
	todo?: Omit<Todo, "id" | "user_id" | "finished">;
	onCancel?: () => void;
	onSubmit: (formData: FormData) => void;
}

const TodoFormRow: React.FC<TodoFormRowProps> = ({
	todo,
	onSubmit,
	onCancel,
}) => {
	const isEditMode = Boolean(todo?.name);

	return (
		<form className="mt-4 flex space-x-2" action={onSubmit}>
			<div className="flex flex-col mb-2">
				<label htmlFor="name" className="mb-1">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="border p-2"
					defaultValue={todo?.name}
				/>
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
					defaultValue={todo?.description}
				/>
			</div>
			<div className="flex flex-col mb-2">
				<label htmlFor="until" className="mb-1">
					Deadline
				</label>
				<input
					type="date"
					id="until"
					name="until"
					className="border p-2"
					defaultValue={todo?.until}
				/>
			</div>
			<div className="flex flex-col mb-2">
				<label htmlFor="priority" className="mb-1">
					Priority
				</label>
				<select id="priority" name="priority" className="border p-2">
					<option value="High">{TodoPriority.High}</option>
					<option value="Medium">{TodoPriority.Medium}</option>
					<option value="Low">{TodoPriority.Low}</option>
				</select>
			</div>
			{isEditMode ? (
				<div className="ml-4 flex space-x-2">
					<button className="text-green-500 hover:text-green-700" type="submit">
						Accept
					</button>
					<button
						className="text-red-500 hover:text-red-700"
						onClick={onCancel}
					>
						Dismiss
					</button>
				</div>
			) : (
				<button type="submit" className="bg-blue-500 text-white p-2 mt-2">
					Add Todo
				</button>
			)}
		</form>
	);
};

export default TodoFormRow;

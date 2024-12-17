"use client";

import React, { useState } from "react";
import { Todo, TodoPriority } from "@/types";
import { deleteTodo, finishTodo, updateTodo } from "@/actions";
import TodoFormRow from "./TodoFormRow";

const TodoRow: React.FC<Todo> = ({
	id,
	name,
	description,
	until,
	priority,
	finished,
}) => {
	const priorityIcon = {
		[TodoPriority.High]: "🔴",
		[TodoPriority.Medium]: "🟠",
		[TodoPriority.Low]: "🟢",
	}[priority];

	const [editMode, setEditMode] = useState(false);

	const handleEditClick = () => setEditMode(!editMode);

	const handleDismissEditing = () => setEditMode(false);

	const handleUpdate = (payload: FormData) => {
		updateTodo(id, payload).finally(() => setEditMode(false));
	};

	const handleFinish = () => finishTodo(id);
	const handleDelete = () => deleteTodo(id);

	const textStyle = finished ? "line-through text-gray-500" : "";

	if (editMode) {
		return (
			<TodoFormRow
				todo={{
					name,
					description,
					until,
					priority,
				}}
				onCancel={handleDismissEditing}
				onSubmit={handleUpdate}
			/>
		);
	}

	return (
		<li
			className={`flex items-center justify-between border-b py-2 ${textStyle}`}
		>
			<span className="flex-1">{name}</span>
			<span className="flex-1 text-center truncate" title={description}>
				{description}
			</span>
			<span className="flex-1 text-right">{until}</span>
			<span className="ml-2">{priorityIcon}</span>

			{!finished && (
				<div className="ml-4 flex space-x-2">
					<button
						className="text-green-500 hover:text-green-700"
						onClick={handleFinish}
						disabled={finished}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</button>
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={handleEditClick}
						disabled={finished}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 20h9"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4h9"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 12h16"
							/>
						</svg>
					</button>
					<button
						className="text-red-500 hover:text-red-700"
						onClick={handleDelete}
						disabled={finished}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}
		</li>
	);
};

export default TodoRow;

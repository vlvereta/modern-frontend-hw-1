"use client";

import React, { useState } from "react";
import { Todo, TodoPriority } from "@/types";
import { deleteTodo, finishTodo, updateTodo } from "@/actions";

const TodoRow: React.FC<Todo> = ({
	id,
	name,
	description,
	until,
	priority,
}) => {
	const priorityIcon = {
		[TodoPriority.High]: "🔴",
		[TodoPriority.Medium]: "🟠",
		[TodoPriority.Low]: "🟢",
	}[priority];

	const [editMode, setEditMode] = useState(false);

	const handleUpdateClick = () => setEditMode(!editMode);

	const handleAcceptUpdating = () => {
		setEditMode(false);
	};

	const handleDismissUpdating = () => setEditMode(false);

	// const handleUpdate = (payload: FormData) => {
	// 	updateTodo(id, payload).finally(() => setEditMode(false));
	// };

	const handleFinish = () => finishTodo(id);
	const handleDelete = () => deleteTodo(id);

	return (
		<li className="flex items-center justify-between border-b py-2">
			{editMode ? (
				<>
					<h3>Editing...</h3>
					<div className="ml-4 flex space-x-2">
						<button
							className="text-green-500 hover:text-green-700"
							onClick={handleAcceptUpdating}
						>
							Accept
						</button>
						<button
							className="text-red-500 hover:text-red-700"
							onClick={handleDismissUpdating}
						>
							Dismiss
						</button>
					</div>
				</>
			) : (
				<>
					<span className="flex-1">{name}</span>
					<span className="flex-1 text-center truncate" title={description}>
						{description}
					</span>
					<span className="flex-1 text-right">{until}</span>
					<span className="ml-2">{priorityIcon}</span>
				</>
			)}

			{!editMode && (
				<div className="ml-4 flex space-x-2">
					<button
						className="text-green-500 hover:text-green-700"
						onClick={handleFinish}
						disabled={editMode}
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
						onClick={handleUpdateClick}
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
						disabled={editMode}
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

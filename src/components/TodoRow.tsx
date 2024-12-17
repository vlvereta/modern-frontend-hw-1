"use client";

import { deleteTodo } from "@/actions";
import { Todo, TodoPriority } from "@/types";

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

	const handleDelete = () => deleteTodo(id);

	return (
		<li className="flex items-center justify-between border-b py-2">
			<span className="flex-1">{name}</span>
			<span className="flex-1 text-center truncate" title={description}>
				{description}
			</span>
			<span className="flex-1 text-right">{until}</span>
			<span className="ml-2">{priorityIcon}</span>
			<div className="ml-4 flex space-x-2">
				<button className="text-green-500 hover:text-green-700">
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
				<button className="text-blue-500 hover:text-blue-700">
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
		</li>
	);
};

export default TodoRow;

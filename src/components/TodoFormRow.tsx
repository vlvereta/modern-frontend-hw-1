"use client";

import React, { useState } from "react";
import { Todo, TodoPriority } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

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

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		todo?.until ? new Date(todo.until) : undefined
	);

	console.log("selectedDate", selectedDate);

	return (
		<form className="mt-4 flex space-x-2 items-end" action={onSubmit}>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					defaultValue={todo?.name}
					placeholder="Name"
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="description">Description</Label>
				<Input
					type="text"
					id="description"
					name="description"
					defaultValue={todo?.description}
					placeholder="Description"
				/>
			</div>

			<div className="grid max-w-sm items-center gap-1.5">
				<Label>Deadline</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								"w-[240px] pl-3 text-left font-normal",
								!selectedDate && "text-muted-foreground"
							)}
						>
							{selectedDate ? (
								selectedDate.toLocaleDateString()
							) : (
								<span>Pick a date</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={selectedDate ?? new Date()}
							onSelect={setSelectedDate}
							initialFocus
							ISOWeek
						/>
					</PopoverContent>
				</Popover>
				<input
					type="hidden"
					name="until"
					value={selectedDate?.toISOString() ?? ""}
				/>
			</div>

			<div className="grid max-w-sm items-center gap-1.5">
				<Label>Priority</Label>
				<Select
					name="priority"
					defaultValue={todo?.priority ?? TodoPriority.Medium}
				>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="Priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={TodoPriority.High}>High</SelectItem>
						<SelectItem value={TodoPriority.Medium}>Medium</SelectItem>
						<SelectItem value={TodoPriority.Low}>Low</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{isEditMode ? (
				<div className="ml-4 flex space-x-2">
					<Button
						type="submit"
						variant="outline"
						className="text-green-500 hover:text-green-700"
					>
						Accept
					</Button>
					<Button
						variant="outline"
						onClick={onCancel}
						className="text-red-500 hover:text-red-700"
					>
						Dismiss
					</Button>
				</div>
			) : (
				<Button type="submit">Add Todo</Button>
			)}
		</form>
	);
};

export default TodoFormRow;

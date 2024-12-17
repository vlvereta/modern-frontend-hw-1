"use server";

import { cookies } from "next/headers";
import { CreateTodoRequestPayload, TodoPriority } from "./types";
import { createClient } from "@/utils/supabase/server";

export async function addTodo(formData: FormData) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const user_id = 1; // TODO: Get user_id from authentication

	const payload: CreateTodoRequestPayload = {
		user_id,
		name: formData.get("name")?.toString() ?? "",
		description: formData.get("description")?.toString() ?? "",
		until: "2024-12-18", // TODO: Parse date
		priority: (formData.get("priority")?.toString() ?? "") as TodoPriority,
	};

	console.log("Adding todo with payload:", payload);
	await supabase.from("todos").insert(payload);
}

export async function deleteTodo(id: number) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	console.log("Deleting todo with id:", id);
	await supabase.from("todos").delete().eq("id", id);
}

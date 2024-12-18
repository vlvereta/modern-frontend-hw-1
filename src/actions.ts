"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { TodoRequestPayload, TodoPriority } from "./types";

const getTodoRequestPayload = (
	formData: FormData
): Omit<TodoRequestPayload, "user_id"> => ({
	name: formData.get("name")?.toString() ?? "Awesome todo",
	description: formData.get("description")?.toString(),
	...(formData.get("until")?.toString() && {
		until: formData.get("until")?.toString(),
	}),
	priority: (formData.get("priority")?.toString() ??
		TodoPriority.Medium) as TodoPriority,
});

export async function addTodo(formData: FormData) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const user_id = 1; // TODO: Get user_id from authentication

	const payload: TodoRequestPayload = {
		user_id,
		...getTodoRequestPayload(formData),
	};

	console.log("Adding todo with payload:", payload);
	await supabase.from("todos").insert(payload);

	revalidatePath("/dashboard");
}

export async function updateTodo(id: number, formData: FormData) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const user_id = 1; // TODO: Get user_id from authentication

	const payload: TodoRequestPayload = {
		user_id,
		...getTodoRequestPayload(formData),
	};

	console.log(`Updating todo with id ${id} with payload:`, payload);
	await supabase.from("todos").update(payload).eq("id", id);

	revalidatePath("/dashboard");
}

export async function finishTodo(id: number) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	console.log("Finishing todo with id:", id);
	await supabase.from("todos").update({ finished: true }).eq("id", id);

	revalidatePath("/dashboard");
}

export async function deleteTodo(id: number) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	console.log("Deleting todo with id:", id);
	await supabase.from("todos").delete().eq("id", id);

	revalidatePath("/dashboard");
}

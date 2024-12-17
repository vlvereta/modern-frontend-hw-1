import { cookies } from "next/headers";
import { addTodo } from "@/actions";
import TodoRow from "@/components/TodoRow";
import TodoFormRow from "@/components/TodoFormRow";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	const { data: todos } = await supabase.from("todos").select("*");
	console.log("Todos:", todos);

	return (
		<>
			<h2 className="text-2xl mb-4">Todos</h2>
			<ul>
				{todos?.map((todo) => (
					<TodoRow key={todo.id} {...todo} />
				))}
			</ul>
			<TodoFormRow onSubmit={addTodo} />
		</>
	);
}

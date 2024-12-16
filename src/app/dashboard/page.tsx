import { cookies } from "next/headers";
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
				{todos.map((todo) => (
					<li key={todo.id} className="border-b py-2">
						{todo.name}
					</li>
				))}
			</ul>
		</>
	);
}

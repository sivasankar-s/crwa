import { Sidebar } from "./Sidebar"
import { PostList } from "./PostList"

export const HomePage =() => {
    return (
        <div>
        <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Crime Incidents</h1>
        <PostList />
      </div>
    </div>
        </div>
    )
}
// app/page.tsx
import { getPosts, createPost } from "./action"

// 1️⃣ Definisikan interface untuk data Post
interface Post {
  id: number
  title: string
  content: string | null
  createdAt?: Date
  updatedAt?: Date
}

// Komponen ini adalah Server Component secara default
export default async function Home() {
  // 2️⃣ Ambil data dari server-side menggunakan fungsi getPosts
  const posts: Post[] = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">My Prisma Blog</h1>

      {/* Form untuk membuat post baru */}
      <form action={createPost} className="mb-12 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title" // harus sesuai dengan yang digunakan di Server Action
            className="block w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="block w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
        >
          Create Post
        </button>
      </form>

      {/* Daftar post */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-400">{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </main>
  )
}

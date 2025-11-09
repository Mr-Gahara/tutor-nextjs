// app/actions.ts
'use server' // Wajib ada di atas untuk menandakan ini Server Action

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Fungsi untuk mengambil semua post
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return posts
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw new Error('Failed to fetch posts.')
  }
}

// Fungsi untuk membuat post baru
// formData akan datang dari <form>
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    throw new Error('Title and content are required.')
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    })

    // Setelah post dibuat, revalidasi path '/'
    // Ini akan memicu pengambilan data baru di halaman utama
    revalidatePath('/')
  } catch (error) {
    console.error('Failed to create post:', error)
    throw new Error('Failed to create post.')
  }
}

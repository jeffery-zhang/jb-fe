import { create } from 'zustand'
import { IPost, ISavePost } from '../interfaces/post.interface'

interface IPostStore {
  currentPost: IPost | null
  setPost: (post: IPost) => void
}

export interface IPostFormData extends ISavePost {
  _id?: string
  tagNames: string
}

interface IPostForm {
  form: IPostFormData
  setForm: (form: Partial<IPostFormData>) => void
  resetForm: () => void
}

export const usePostStore = create<IPostStore>((set) => ({
  currentPost: null,
  setPost: (post) => {
    set({ currentPost: post })
  },
}))

export const initPostForm = {
  title: '',
  content: '',
  intro: '',
  poster: '',
  category: '',
  tags: [],
  tagNames: '',
  isPublic: true,
}

export const usePostFormStore = create<IPostForm>((set, get) => ({
  form: initPostForm,
  setForm: (form) => {
    set({
      form: {
        ...get().form,
        ...form,
      },
    })
  },
  resetForm: () => {
    set({ form: initPostForm })
  },
}))

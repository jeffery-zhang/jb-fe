import { create } from 'zustand'
import { IPost, ISavePost } from '../interfaces/post.interface'

interface IPostStore {
  currentPost: IPost | null
  setPost: (post: IPost) => void
}

interface IPostForm {
  form: ISavePost
  setForm: (form: Partial<ISavePost>) => void
  resetForm: () => void
}

export const usePostStore = create<IPostStore>((set) => ({
  currentPost: null,
  setPost: (post) => {
    set({ currentPost: post })
  },
}))

const initPostForm = {
  title: '',
  content: '',
  intro: '',
  poster: '',
  category: '',
  tags: [],
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

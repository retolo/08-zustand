import {create} from 'zustand';
import { CreateNoteTask } from '../api';
import { persist } from 'zustand/middleware';
type NoteDraftStore = {
    draft: CreateNoteTask,
    setDraft: (note: CreateNoteTask) => void,
    clearDraft: () => void,
}

const initialDraft: CreateNoteTask = {
    title: '',
    content: '',
    tag: '',
}


export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) =>({
            draft: initialDraft,
            setDraft: (newData: CreateNoteTask) => set({draft: newData}),
            clearDraft: () => set({draft: initialDraft})
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({draft: state.draft})
        }
    )
    
)
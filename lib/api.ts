import axios from "axios";
import { type Note} from "../types/note";



interface FetchNotesProps{
    notes: Note[]
    totalPages: number
}

interface CreateNoteTask{
    title: string
    content: string
    tag: string

}

interface FetchNotesRequest{
    searchText?: string
    pageQuery?: number
    tagNote?: string | null
}


export const fetchNotes = async ({searchText, pageQuery, tagNote}: FetchNotesRequest): Promise<FetchNotesProps> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await axios.get<FetchNotesProps>(
        'https://notehub-public.goit.study/api/notes',
        {
            params:{
                ...(searchText ? { search: searchText } : {}),
                ...(pageQuery ? { page: pageQuery } : {}),
                ...(tagNote ? { tag: tagNote } : {}),
                
                
                
            },
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
        
    );

    
    return response.data

}


export const  createNote = async (newTask: CreateNoteTask): Promise<Note> => {
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await axios.post<Note>(
        `https://notehub-public.goit.study/api/notes/`, newTask,
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }

    )
    return response.data
}

export const  deleteNote = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}


export const  fetchNoteById = async (id: string): Promise<Note> =>{
    const mykey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response = await axios.get<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}


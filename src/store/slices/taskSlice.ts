import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface Task {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;
}

export interface IEditTask {
  name: string,
  value: string | boolean | number
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  activePage: number;
  perPage: number;
}

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  loading: false,
  error: null,
  activePage: 1,
  perPage: 5
};

export const fetchTasks = createAsyncThunk<Task[], { page: number; limit: number }, { state: RootState }>(
  'tasks/fetchTasks',
  async ({ page, limit }, { getState }) => {
    const state = getState();
    if (state.tasks.tasks.length) return state.tasks.tasks;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
    );

    const data: Task[] = await response.json();
    localStorage.setItem('tasks', JSON.stringify(data));
    return data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(state.tasks));

      const totalPages = Math.ceil(state.tasks.length / state.perPage);
      if (state.tasks.length % state.perPage === 1) {
        state.activePage = totalPages;
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));

      const totalPages = Math.ceil(state.tasks.length / state.perPage);
      if (state.activePage > totalPages) {
        state.activePage = Math.max(1, totalPages);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addTask, removeTask, updateTask, changePage } = taskSlice.actions;
export default taskSlice.reducer;

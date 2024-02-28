import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customFetch } from './utils';
import { toast } from 'react-toastify';

export const useFetchTasks = () => {
    const { isLoading, data, error, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await customFetch.get('/');

            return data;
        },
    });

    return { isError, data, isLoading, error };
};

export const useCreateTasks = () => {
    const queryClient = useQueryClient();

    const { mutate: createTask, isLoading } = useMutation({
        mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task added');
        },

        onError: (err) => {
            toast.error(err.response.data.msg);
        },
    });
    return { createTask, isLoading };
};

export const useEditTasks = () => {
    const queryClient = useQueryClient();
    const { mutate: editTask } = useMutation({
        mutationFn: ({ taskId, isDone }) =>
            customFetch.patch(`/${taskId}`, { isDone }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return { editTask };
};
export const useDeleteTasks = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteTask, isLoading } = useMutation({
        mutationFn: (taskId) => customFetch.delete(`/${taskId}`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return { deleteTask, isLoading };
};

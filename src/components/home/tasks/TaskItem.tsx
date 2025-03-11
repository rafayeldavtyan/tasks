import { useState } from 'react';
import { Task, removeTask, updateTask } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import ModalDialog from '@components/modal-dialog/ModalDialog';
import { motion } from 'framer-motion';
import useToaster from '@shared/hooks/useToaster';
import { MdDeleteForever } from "react-icons/md";

const TaskItem = ({ task }: { task: Task }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { successMessage } = useToaster();

    const handleDelete = async () => {
        setIsDeleting(true);
        if (!task.id) return;
        setTimeout(async () => {
            try {
                dispatch(removeTask(task.id || -1));
                successMessage("Task deleted successfully!");
            } catch (error) {
                console.error('Error deleting task:', error);
            } finally {
                setIsDeleting(false);
                setIsOpen(false);
            }
        }, 1000);
    };

    const handleComplete = () => {
        if (task.completed) return;
        dispatch(updateTask({ ...task, completed: !task.completed }));
        successMessage("Task status updated successfully!");
    };

    return (
        <>
            <motion.tr
                className="bg-white border-b border-stroke shadow-default"
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                <td className="px-6 py-4 text-center">{task.id}</td>
                <td className="px-6 py-4 text-left">{task.title}</td>
                <td className="px-6 py-4 text-left">
                    {task.completed
                        ? <span className='text-success'>Complete</span>
                        : <button
                            onClick={handleComplete}
                            className='text-danger hover:underline'
                        >
                            In Progress
                        </button>
                    }
                </td>
                <td onClick={() => setIsOpen(true)} className="hover:text-red-800 px-6 py-4 cursor-pointer text-center">
                    <MdDeleteForever className='text-red-500' />
                </td>
            </motion.tr>

            <ModalDialog
                isOpen={isOpen}
                title="Delete Task"
                children={<p>Are you sure you want to delete the <strong>{task?.title}</strong> task?</p>}
                onSubmit={handleDelete}
                handleClose={() => setIsOpen(false)}
                loading={isDeleting}
            />
        </>
    );
};

export default TaskItem;

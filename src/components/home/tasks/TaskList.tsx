import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { fetchTasks, addTask, IEditTask, changePage } from '@store/slices/taskSlice';
import TaskItem from './TaskItem';
import ModalDialog from '@components/modal-dialog/ModalDialog';
import AddTaskForm from './AddTaskForm';
import useToaster from '@shared/hooks/useToaster';
import Pagination from '@shared/ui/SPagination';
import { IoSearchOutline } from "react-icons/io5";


const TaskList = () => {
    const { successMessage } = useToaster();

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [task, setTask] = useState({ title: "", completed: false });
    const dispatch = useDispatch<AppDispatch>();

    const [addLoading, setAddLoading] = useState<boolean>(false);
    const { tasks, error, loading: taskLoad, perPage, activePage } = useSelector((state: RootState) => state.tasks);

    const [errors, setErrors] = useState<Record<string, string>>({
        title: "Field is required",
    });

    useEffect(() => {
        dispatch(fetchTasks({ page: activePage, limit: perPage }));
    }, [activePage, tasks.length]);

    if (error) return <div>Error: {error}</div>;

    const onOpen = () => setIsOpen(true);
    const onClose = () => {
        setTask({ title: "", completed: false })
        setIsOpen(false);
    }

    const onChange = (data: IEditTask) => {
        setErrors({
            ...errors,
            [data.name]: !data.value ? 'Field is required' : ''
        })
        setTask({ ...task, [data.name]: data.value })
    }

    const handleAddTask = async () => {
        if (errors.title) return;

        setAddLoading(true);
        const newTask = {
            userId: 1,
            id: tasks.length + 1,
            title: task.title,
            completed: task.completed,
        };

        dispatch(addTask(newTask));

        setTimeout(() => {
            successMessage("Task created successfully");
            onClose();
            setAddLoading(false);
        }, 1000)
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTasks.length / perPage);
    const startIndex = (activePage - 1) * perPage;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + perPage);

    const isApprovedSubmit = Object.values(errors).every(it => !it)

    return (
        <div>
            <div className="flex items-center justify-between pb-4">
                <div className="relative w-80">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:outline-none"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button onClick={onOpen} className="py-2 px-4 text-white bg-gray-700 rounded-4 hover:bg-gray-600 transition">
                    Add Task
                </button>
            </div>


            <table className="w-full text-sm text-left text-gray-500 border border-stroke shadow-default rounded-4">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-left">Title</th>
                        <th scope="col" className="px-6 py-3 text-left">Status</th>
                        <th scope="col" className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskLoad ? (
                        [1, 2, 3].map((_, index) => (
                            <tr key={index} className="animate-pulse">
                                <td className="px-6 py-4 bg-gray-300 h-6 rounded-md"></td>
                                <td className="px-6 py-4 bg-gray-300 h-6 rounded-md"></td>
                                <td className="px-6 py-4 bg-gray-300 h-6 rounded-md"></td>
                                <td className="px-6 py-4 bg-gray-300 h-6 rounded-md"></td>
                            </tr>
                        ))
                    ) : !!filteredTasks.length ? (
                        paginatedTasks.map((task) => <TaskItem key={task.id} task={task} />)
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-300">
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


            <Pagination
                currentPage={activePage}
                totalPages={totalPages}
                totalResults={filteredTasks.length}
                resultsPerPage={perPage}
                onPageChange={(page) => dispatch(changePage(page))}
            />

            <ModalDialog
                isOpen={isOpen}
                children={<AddTaskForm errors={errors} task={task} onChange={onChange} />}
                title="Add New Task"
                onSubmit={handleAddTask}
                handleClose={onClose}
                loading={addLoading}
                disabled={!isApprovedSubmit}
            />
        </div>
    );
};

export default TaskList;

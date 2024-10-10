import { LogoutOutlined } from '@ant-design/icons';
import { Button, Form, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import FilterTasks from './FilterTasks';
import FormTasks from './FormTasks';
import TaskCards from './TaskCards';

const { Title } = Typography;

const TaskManager = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortOption, setSortOption] = useState('Sort'); 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');
    const [form] = Form.useForm();

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Update filtered tasks whenever tasks or filters change
    useEffect(() => {
        filterAndSortTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, filterStatus, sortOption, currentPage, searchQuery]);

    // Filter and sort tasks based on user selection
    const filterAndSortTasks = () => {
        let filtered = tasks;

        // Apply search filter
        if (searchQuery) {
            filtered = tasks.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'All') {
            filtered = filtered.filter(task => task.status === filterStatus);
        }

        // Apply sorting
        if (sortOption === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'status') {
            filtered.sort((a, b) => a.status.localeCompare(b.status));
        }

        // By default, show the latest task first (newly added tasks at the top)
        if (!sortOption) {
            console.log(sortOption);
            console.log(filtered.reverse());

            filtered = filtered.reverse(); // Reverse the order to show latest first
        }

        // Paginate filtered tasks
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        setFilteredTasks(filtered.slice(start, end));
    };

    // Show modal to add/edit task
    const showModal = (task = null) => {
        setIsModalVisible(true);
        if (task) {
            setIsEditing(true);
            setEditingTask(task);
            form.setFieldsValue({ title: task.title, description: task.description, status: task.status });
        } else {
            setIsEditing(false);
            form.resetFields();
        }
    };



    // Handle delete task
    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    // Handle status change filter
    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Handle sort option change
    const handleSortChange = (value) => {
        setSortOption(value);
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page after searching
    };




    // Handle reset filters
    const handleResetFilters = () => {
        setFilterStatus('All');
        setSortOption('Sort');
        setSearchQuery('');
        setCurrentPage(1);

        // Restore original tasks and sort by ID in descending order
        let resetTasks = [...tasks];
        resetTasks = resetTasks.sort((a, b) => b.id - a.id);
        setTasks(resetTasks);
        filterAndSortTasks();

    };

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };


    return (
        <div className="home_page">
            <div className="container  log_out">
                <Title level={2} className="title">Task Management</Title>
                {/* Filter Tasks */}
                <FilterTasks
                    showModal={showModal}
                    filterStatus={filterStatus}
                    handleFilterChange={handleFilterChange}
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleResetFilters={handleResetFilters}
                    showDrawer={showDrawer}
                    isDrawerVisible={isDrawerVisible}
                    setIsDrawerVisible={setIsDrawerVisible}

                />



                {/* Task Cards */}
                <TaskCards
                    filteredTasks={filteredTasks}
                    showModal={showModal}
                    handleDelete={handleDelete}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                     tasks={tasks}
                />



                <div className="out">
                    <Tooltip placement="right" title={'LogOut'}>
                        <Button icon={<LogoutOutlined />} onClick={onLogout} />
                    </Tooltip>
                </div>

                {/* Modal for Add/Edit Task */}
                <FormTasks
                    tasks={tasks}
                    form={form}
                    isEditing={isEditing}
                    editingTask={editingTask}
                    isModalVisible={isModalVisible}
                    setTasks={setTasks}
                    setIsModalVisible={setIsModalVisible}
                    setEditingTask={setEditingTask}
                />


            </div>
        </div>
    );
};

export default TaskManager;

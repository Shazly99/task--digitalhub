import { Input as AntInput, Button, Card, Col, Drawer, Form, Input, Modal, Pagination, Popconfirm, Row, Select, Tag, Tooltip, Typography } from 'antd';
import React from 'react'
import ReactQuill from 'react-quill'
const { Option } = Select;
const { Title } = Typography;
const { Search } = AntInput;

const FormTasks = ({ form, isEditing, tasks, setTasks, editingTask ,setIsModalVisible,isModalVisible}) => {
 
    // Handle modal OK click
    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                if (isEditing) {
                    const updatedTasks = tasks.map(task =>
                        task.id === editingTask.id ? { ...task, ...values } : task
                    );
                    setTasks(updatedTasks);
                } else {
                    const newTask = {
                        id: tasks.length + 1,
                        ...values,
                    };
                    setTasks([newTask, ...tasks]); // Add the new task to the beginning of the list
                }
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    // Handle modal Cancel click
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
    return (
        <Modal
            title={isEditing ? 'Edit Task' : 'Add Task'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Task Title"
                    rules={[{ required: true, message: 'Please input the task title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Task Description"
                    rules={[{ required: true, message: 'Please input the task description!' }]}
                >
                    <ReactQuill
                    />
                </Form.Item>
                <Form.Item name="status" label="Status" initialValue="To do">
                    <Select>
                        <Option value="To do">To do</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FormTasks

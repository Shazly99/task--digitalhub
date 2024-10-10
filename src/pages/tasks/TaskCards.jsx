import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Pagination, Popconfirm, Row, Tag } from 'antd'
import React from 'react'

const TaskCards = ({ filteredTasks, showModal, handleDelete,
    currentPage,
    pageSize,
    setCurrentPage,
    tasks
}) => {
    // Get status tag based on the task's status
    const getStatusTag = (status) => {
        switch (status) {
            case 'To do':
                return <Tag color="warning">To do</Tag>;
            case 'In Progress':
                return <Tag color="processing">In Progress</Tag>;
            case 'Done':
                return <Tag color="success">Done</Tag>;
            default:
                return <Tag>Unknown</Tag>;
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {filteredTasks.map(task => (
                    <Col xl={12} lg={12} md={12} sm={24} xs={24} key={task.id}>
                        <Card
                            title={(
                                <div className='status_title'  >
                                    <span className='title'>{task.title}</span>
                                    {getStatusTag(task.status)}
                                </div>
                            )}
                            extra={
                                <div>
                                    <Button onClick={() => showModal(task)} style={{ marginRight: '10px' }} icon={<EditOutlined />} />
                                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(task.id)}>
                                        <Button type="text" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </div>
                            }
                            bordered={false}
                            className="task-card"
                        >
                            <div dangerouslySetInnerHTML={{ __html: task?.description }} />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={tasks.length}
                onChange={handlePageChange}
                className="pagination"
            />
        </div>
    )
}

export default TaskCards

import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Input as AntInput, Button, Col, Drawer, Row, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { Search } = AntInput;

const FilterTasks = ({
    showModal,
    filterStatus,
    handleFilterChange,
    sortOption,
    handleSortChange,
    searchQuery,
    handleSearchChange,
    handleResetFilters,
    showDrawer,
    isDrawerVisible,
    setIsDrawerVisible
}) => {

    const closeDrawer = () => {
        setIsDrawerVisible(false);
    };
    return (
        <>
            <Row gutter={[24, 24]} justify="center" align="middle" className="filter-row" style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '10px' }}>
                <Col span={6} className='filter_lg'>
                    <Select
                        value={filterStatus}
                        style={{ width: '100%', borderRadius: '10px' }}
                        onChange={handleFilterChange}
                    >
                        <Option value="All">All Tasks</Option>
                        <Option value="To do" className="not-started">To do</Option>
                        <Option value="In Progress" className="in-progress">In Progress</Option>
                        <Option value="Done" className="Done">Done</Option>
                    </Select>
                </Col>

                <Col span={6} className='filter_lg'>
                    <Select
                        value={sortOption}
                        style={{ width: '100%', borderRadius: '10px' }}
                        onChange={handleSortChange}
                        placeholder="Sort"
                    >
                        <Option value="title">Sort by Title</Option>
                        <Option value="status">Sort by Status</Option>
                    </Select>
                </Col>

                <Col span={6} className='filter_lg'>
                    <Search
                        placeholder="Search tasks by title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '100%', borderRadius: '10px' }}
                        allowClear
                    />
                </Col>

                <Col span={3} className='filter_lg'>
                    <Button
                        type="default"
                        onClick={handleResetFilters}
                        icon={<ReloadOutlined />}
                        style={{ width: '100%', borderRadius: '10px', backgroundColor: '#f0f0f0', color: '#1890ff' }}
                    >
                        Reset
                    </Button>
                </Col>

                <Col lg={3} xl={3} md={24} sm={24} xs={24} className='filter_lg'>
                    <Button
                        type="primary"
                        onClick={() => showModal()}
                        style={{ width: '100%' }}
                    >
                        Add Task
                    </Button>
                </Col>
                <Col lg={24} xl={24} md={24} sm={24} xs={24} >
                    <Row className="filter_sm">
                        <Col sm={12} xs={12} >
                            <Button
                                type="primary"
                                onClick={() => showModal()}
                            >
                                Add Task
                            </Button>
                        </Col>
                        <Col sm={12} xs={12} justify="center" ga align="middle" className="filter-small"  >
                            <Button
                                type="default"
                                onClick={handleResetFilters}
                                icon={<ReloadOutlined />}
                                style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', color: '#1890ff' }}
                            />
                            <Button icon={<FilterOutlined />} onClick={showDrawer} />
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Drawer
                title="Filters"
                placement="bottom"
                onClose={closeDrawer}
                visible={isDrawerVisible}
                height="300px"
            >

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Select
                            value={filterStatus}
                            style={{ width: '100%' }}
                            onChange={handleFilterChange}
                        >
                            <Option value="All">All Tasks</Option>
                            <Option value="To do">To do</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="Done">Done</Option>
                        </Select>
                    </Col>

                    <Col span={24}>
                        <Select
                            value={sortOption}
                            style={{ width: '100%' }}
                            onChange={handleSortChange}
                            placeholder="Sort"
                        >
                            <Option value="title">Sort by Title</Option>
                            <Option value="status">Sort by Status</Option>
                        </Select>
                    </Col>

                    <Col span={24}>
                        <Search
                            placeholder="Search tasks by title"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ width: '100%' }}
                            allowClear
                        />
                    </Col>


                </Row>
            </Drawer>
        </>
    )
}

export default FilterTasks

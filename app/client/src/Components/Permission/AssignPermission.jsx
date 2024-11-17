import React, { useState, useEffect } from 'react';
import { Tree, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { update_permission } from '../../App/Slice/permissionSlice';
import Swal from 'sweetalert2';

const treeData = [
    {
        title: 'Admin',
        key: 'admin',
        children: [
            {
                title: 'All',
                key: 'admin-all',
                children: [
                    { title: 'View', key: 'admin-view' },
                    { title: 'Edit', key: 'admin-edit' },
                    { title: 'Delete', key: 'admin-delete' },
                    { title: 'Add', key: 'admin-add' },
                ],
            },
        ],
    },
    {
        title: 'Manager',
        key: 'manager',
        children: [
            {
                title: 'All',
                key: 'manager-all',
                children: [
                    { title: 'View', key: 'manager-view' },
                    { title: 'Edit', key: 'manager-edit' },
                    { title: 'Delete', key: 'manager-delete' },
                    { title: 'Add', key: 'manager-add' },
                ],
            },
        ],
    },
    {
        title: 'DataEntry',
        key: 'dataentry',
        children: [
            {
                title: 'All',
                key: 'dataentry-all',
                children: [
                    { title: 'View', key: 'dataentry-view' },
                    { title: 'Edit', key: 'dataentry-edit' },
                    { title: 'Delete', key: 'dataentry-delete' },
                    { title: 'Add', key: 'dataentry-add' },
                ],
            },
        ],
    },
    {
        title: 'Accountant',
        key: 'accountant',
        children: [
            {
                title: 'All',
                key: 'accountant-all',
                children: [
                    { title: 'View', key: 'accountant-view' },
                    { title: 'Edit', key: 'accountant-edit' },
                    { title: 'Delete', key: 'accountant-delete' },
                    { title: 'Add', key: 'accountant-add' },
                ],
            },
        ],
    },
];

const AssignPermission = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState({});
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const { user } = useSelector(state => state.User);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialCheckedKeys = {};

        treeData.forEach(item => {
            initialCheckedKeys[item.key] = [];
        });

        if (user && user.permissions) {
            user.permissions.forEach(permission => {
                const resourceKey = permission.resource.toLowerCase().replace(' ', '-');
                const actions = Object.keys(permission.access).filter(action => permission.access[action]);
                initialCheckedKeys[resourceKey] = [...(initialCheckedKeys[resourceKey] || []), ...actions.map(action => `${resourceKey}-${action.toLowerCase()}`)];
            });
        }

        setCheckedKeys(initialCheckedKeys);
    }, [user]);

    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue, info) => {
        const { node } = info;
        const parentKey = node.key.split('-')[0];

        setCheckedKeys((prev) => ({
            ...prev,
            [parentKey]: checkedKeysValue,
        }));
    };

    const handleLogCheckedKeys = async () => {
        const permissions = [];

        treeData.forEach(item => {
            item.children.forEach(child => {
                child.children.forEach(permission => {
                    if (checkedKeys[item.key]?.includes(permission.key)) {
                        const resourcePermissions = permissions.find(p => p.resource === item.title);

                        if (resourcePermissions) {
                            resourcePermissions.access[permission.title] = true;
                        } else {
                            permissions.push({
                                resource: item.title,
                                access: {
                                    [permission.title]: true
                                }
                            });
                        }
                    }
                });
            });
        });

        // Fill access for unchecked permissions
        permissions.forEach(resource => {
            const allActions = ['View', 'Edit', 'Delete', 'Add'];
            allActions.forEach(action => {
                if (!resource.access[action]) {
                    resource.access[action] = false;
                }
            });
        });

        try {
            const result = await dispatch(update_permission({ permission: permissions, id: user._id }));
            console.log('Updated Permissions:', result);

            const hasFullAccess = permissions.some(resource =>
                Object.values(resource.access).every(value => value === true)
            );

            if (hasFullAccess) {
                Swal.fire({
                    icon: 'success',
                    title: 'Permissions Updated',
                    text: 'You have been granted full access.',
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Permissions Updated',
                    text: 'Your permissions have been updated.',
                });
            }
        } catch (error) {
            console.error('Error updating permissions:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an issue updating permissions.',
            });
        }

        console.log('Permissions:', JSON.stringify(permissions, null, 2));
    };

    return (
        <div>
            <Row gutter={16}>
                {treeData.map((item, index) => (
                    <Col span={4} key={index}>
                        <h3>{item.title}</h3>
                        <Tree
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys[item.key] || []}
                            treeData={[item]}
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={handleLogCheckedKeys}
                        style={{ marginTop: '20px' }}
                    >
                        Log Checked Permissions
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default AssignPermission;

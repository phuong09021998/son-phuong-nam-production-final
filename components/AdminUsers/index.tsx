import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './AdminUser.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Table, Tag, Space, Popconfirm, message } from 'antd';
import TopAdminTable from '../TopAdminTable';
import Modal from 'react-modal';
import CancelIcon from '@material-ui/icons/Cancel';
import FormField from '../FormField';
import { update, generateData, isFormValid } from 'components/utils/formAction';
import Button from '@material-ui/core/Button';
import { createUserByAdmin, editUser, deleteUser, getUsers } from 'redux/actions/admins';
interface Props {
  getUsers(): void;
  users: any;
  createUserByAdmin(data: any): void;
  createUserError: string;
  deleteUser(data: any): void;
  deleteUserError: string;
  editUser(data: any): void;
  editUserError: string;
  getUsersError: string;
}

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '25rem',
  },
};

function AdminUsers({
  getUsers,
  users,
  createUserByAdmin,
  createUserError,
  deleteUser,
  deleteUserError,
  editUser,
  editUserError,
  getUsersError,
}: Props) {
  const initialForm = {
    formError: false,
    formMessage: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          // placeholder: 'Email',
          label: 'Email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'name',
          label: 'Tên',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      role: {
        element: 'select',
        value: 'Quản trị viên',
        config: {
          name: 'role_input',
          type: 'name',
          label: 'Vai trò',
          options: [{ value: 'Người dùng' }, { value: 'Quản trị viên' }],
        },
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          label: 'Mật khẩu',
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          // placeholder: 'Mật khẩu',
          label: 'Nhập lại mật khẩu',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
    },
  };

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isWaiting, setWaiting] = useState(false);
  const [edit, setEdit] = useState({ active: false, id: 'none' });

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: number) => {
        if (role === 2) {
          return <Tag color="red">Chủ sở hữu</Tag>;
        } else if (role === 1) {
          return <Tag color="orange">Quản trị viên</Tag>;
        } else {
          return <Tag color="green">Nguời dùng</Tag>;
        }
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          {record.role !== 2 && <a onClick={() => handleEditUser(record._id)}>Sửa</a>}
          {record.role !== 2 && (
            <Popconfirm
              title="Bạn có muốn xóa người dùng này?"
              onConfirm={() => confirm(record._id)}
              okText="Xóa"
              cancelText="Không"
            >
              <a>Xóa</a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  function confirm(id: string) {
    deleteUser({ id });
  }

  const selectUserRole = (role: number) => {
    if (role === 0) {
      return 'Người dùng';
    } else if (role === 1) {
      return 'Quản trị viên';
    } else {
      return 'Chủ sở hữu';
    }
  };

  const handleEditUser = (id: string) => {
    const usersArr: any = Object.values(users);
    const selectedUser = usersArr.find((user: any) => user._id === id);
    setEdit({ active: true, id: selectedUser._id });
    setForm({
      ...form,
      formdata: {
        ...form.formdata,
        email: {
          ...form.formdata.email,
          value: selectedUser.email,
          valid: true,
        },
        name: {
          ...form.formdata.name,
          value: selectedUser.name,
          valid: true,
        },
        role: {
          ...form.formdata.role,
          value: selectUserRole(selectedUser.role),
          valid: true,
        },
        password: {
          ...form.formdata.password,
          valid: true,
        },
      },
    });
    setOpenModal(true);
  };

  const handleCreate = () => {
    setEdit({ active: false, id: 'none' });
    setForm(initialForm);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setForm(initialForm);
  };

  const updateForm = (element: any) => {
    const newFormdata: any = update(element, form.formdata, 'admin_register');
    setForm({
      ...form,
      formError: false,
      formdata: newFormdata,
    });
  };

  const submitForm = (e: any): void => {
    e.preventDefault();

    const dataToSubmit = generateData(form.formdata, 'admin_register');
    const formIsValid = isFormValid(form.formdata, 'admin_register');

    if (formIsValid) {
      if (edit.active) {
        editUser({ id: edit.id, fields: dataToSubmit });
      } else {
        createUserByAdmin(dataToSubmit);
      }
      setWaiting(true);
    } else {
      setForm({
        ...form,
        formError: true,
        formMessage: 'Kiểm tra lại thông tin',
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (deleteUserError) {
      message.error('Xóa thất bại');
    }
    if (editUserError) {
      message.error('Sửa thất bại');
    }
    if (getUsersError) {
      message.error('Lấy người dùng thất bại');
    }
  }, [deleteUserError, editUserError, getUsersError]);

  useEffect(() => {
    if (users !== undefined) {
      setLoading(false);
      setWaiting(false);
      setOpenModal(false);
    }
  }, [users]);

  useEffect(() => {
    if (createUserError === 'Email đã tồn tại') {
      setForm({
        ...form,
        formdata: {
          ...form.formdata,
          email: {
            ...form.formdata.email,
            valid: false,
            validationMessage: createUserError,
          },
        },
      });

      setWaiting(false);
    } else {
      setForm({
        ...form,
        formError: true,
        formMessage: createUserError,
      });
    }
  }, [createUserError]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={50} thickness={4} />
      </div>
    );
  } else {
    const usersArr: any = Object.values(users);

    return (
      <React.Fragment>
        <div className={styles.tableWrapper}>
          <div className={styles.topWrapper}>
            <TopAdminTable handleCreate={handleCreate} />
          </div>
          <div className={styles.table}>
            <Table columns={columns} dataSource={usersArr} rowKey={(record) => record._id} />
          </div>
        </div>
        <Modal
          isOpen={openModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <div className={styles.modalTitle}>{edit.active ? 'Sửa người dùng' : 'Thêm người dùng'}</div>
          <form className={styles.form} onSubmit={(event) => submitForm(event)}>
            <FormField id={'email'} formdata={form.formdata.email} change={(e: any) => updateForm(e)} />
            <FormField id={'name'} formdata={form.formdata.name} change={(e: any) => updateForm(e)} />
            <FormField id={'role'} formdata={form.formdata.role} change={(e: any) => updateForm(e)} />
            <FormField id={'password'} formdata={form.formdata.password} change={(e: any) => updateForm(e)} />
            <FormField
              id={'confirmPassword'}
              formdata={form.formdata.confirmPassword}
              change={(e: any) => updateForm(e)}
            />
            {form.formError && <div className={styles.errorLabel}>{form.formMessage}</div>}
            {isWaiting && (
              <div className={styles.waiting}>
                <CircularProgress color="secondary" />
              </div>
            )}
            <Button
              variant="contained"
              color="secondary"
              className={styles.button}
              onClick={(event) => submitForm(event)}
            >
              {edit.active ? 'Sửa' : 'Đăng ký'}
            </Button>
          </form>
          <div className={styles.close}>
            <CancelIcon color="secondary" style={{ cursor: 'pointer' }} onClick={closeModal} />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.admins.data,
  createUserError: state.admins.createUserError,
  deleteUserError: state.admins.deleteUserError,
  editUserError: state.admins.editUserError,
  getUsersError: state.admins.getUsersError,
});

export default connect(mapStateToProps, { getUsers, createUserByAdmin, deleteUser, editUser })(AdminUsers);

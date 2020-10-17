import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getProductsByAdmin,
  createProduct,
  deleteProduct,
  updatePublish,
  updateProduct,
  updateAvailable,
} from 'redux/actions/products';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './AdminPosts.module.scss';
import TopAdminTable from '../TopAdminTable';
import { Table, Space, Popconfirm, message, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import FormField from '../FormField';
import Button from '@material-ui/core/Button';
import { update, generateData, isFormValid } from 'components/utils/formAction';
// @ts-ignore
import currencyFormatter from 'currency-formatter'
interface Props {
  getProductsByAdmin(): void;
  products: any;
  createProduct(data: any): void;
  deleteProduct(id: any): void;
  getProductsError: any;
  createProductError: any;
  deleteProductError: any;
  updatePublish(data: any): void;
  updateProduct(data: any): void;
  updatePublishError: boolean;
  updateProductError: boolean;
  updateAvailableError: boolean;
  updateAvailable(data: any): void;
}

function AdminProducts({
  products,
  getProductsByAdmin,
  createProduct,
  deleteProduct,
  getProductsError,
  createProductError,
  deleteProductError,
  updatePublish,
  updateProduct,
  updatePublishError,
  updateProductError,
  updateAvailableError,
  updateAvailable,
}: Props) {
  const initialForm = {
    formError: false,
    formMessage: '',
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          // placeholder: 'Email',
          label: 'Tên sản phẩm',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      image: {
        element: 'image',
        value: '',
        config: {
          label: 'Ảnh đại diện',
          placeholder: '',
        },
        validation: {
          required: true,
        },
        valid: false,
        showlabel: true,
        touched: true,
        validationMessage: 'Bạn phải nhập mục này',
      },
      price: {
        element: 'input',
        value: '',
        config: {
          name: 'price_input',
          type: 'number',
          // placeholder: 'Email',
          label: 'Giá',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
      salePrice: {
        element: 'input',
        value: '',
        config: {
          name: 'sale_price_input',
          type: 'number',
          // placeholder: 'Email',
          label: 'Giá khuyến mãi',
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        showlabel: true,
        validationMessage: '',
      },
    },
  };

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({
    active: false,
    status: 'none',
  });
  const [form, setForm] = useState(initialForm);
  const [isWaiting, setWaiting] = useState(false);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      // @ts-ignore
      render: (price: number, doc: any) => {
        if (doc.salePrice) {
          return currencyFormatter.format(doc.salePrice, {code: 'VND'})
        } else {
          return currencyFormatter.format(doc.price, {code: 'VND'})
        }
      },
    },
    {
      title: 'Xuất bản',
      dataIndex: 'publish',
      key: 'publish',
      render: (publish: boolean, record: any) => (
        <Switch
          defaultChecked={publish}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={(check) => handleSwitchChange(check, record._id)}
        />
      ),
    },
    {
      title: 'Hết hàng / Có sẵn',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean, record: any) => (
        <Switch
          defaultChecked={available}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={(check) => handleSwitchAvailableChange(check, record._id)}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={(e) => handleEdit(e, record.urlTitle)}>Sửa</a>
          <Popconfirm
            title="Bạn có muốn sản phẩm này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Không"
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  // @ts-ignore
  const handleEdit = (e: any, urlTitle: string) => {
    const productsArr = Object.values(products);
    const selectedProduct: any = productsArr.find((product: any) => product.urlTitle === urlTitle);
    setEdit({ active: true, status: selectedProduct._id });
    setForm({
      ...form,
      formdata: {
        ...form.formdata,
        name: {
          ...form.formdata.name,
          value: selectedProduct.name,
          valid: true,
        },
        price: {
          ...form.formdata.price,
          value: selectedProduct.price,
          valid: true,
        },
        salePrice: {
          ...form.formdata.salePrice,
          value: selectedProduct.salePrice,
          valid: true,
        },
        image: {
          ...form.formdata.image,
          value: `/api/product/image/${urlTitle}`,
          valid: true,
        },
      },
    });
  };

  const handleSwitchChange = (check: boolean, id: string) => {
    updatePublish({ publish: check, id });
  };

  const handleSwitchAvailableChange = (check: boolean, id: string) => {
    updateAvailable({ available: check, id });
  };

  const handleDelete = (id: string) => {
    deleteProduct({ id });
  };

  const handleCreatePost = () => {
    setEdit({ active: true, status: 'create' });
    setWaiting(false);
    setForm(initialForm);
  };

  const updateForm = (element: any) => {
    const newFormdata: any = update(element, form.formdata, 'posts');
    setForm({
      ...form,
      formError: false,
      formdata: newFormdata,
    });
  };

  const submitForm = (e: any): void => {
    e.preventDefault();

    const dataToSubmit = generateData(form.formdata, 'posts');
    const formIsValid = isFormValid(form.formdata, 'posts');

    if (formIsValid) {
      setWaiting(true);
      if (edit.active && edit.status === 'create') {
        createProduct(dataToSubmit);
      } else {
        console.log(dataToSubmit);
        updateProduct({ ...dataToSubmit, id: edit.status });
      }
    } else {
      setForm({
        ...form,
        formError: true,
        formMessage: 'Kiểm tra lại thông tin',
      });
    }
  };

  const exitForm = (e: any) => {
    e.preventDefault();

    setEdit({ active: false, status: 'none' });
    setWaiting(false);
  };

  useEffect(() => {
    getProductsByAdmin();
  }, []);

  useEffect(() => {
    if (getProductsError) {
      message.error(getProductsError);
    }
  }, [getProductsError]);

  useEffect(() => {
    if (deleteProductError) {
      message.error(deleteProductError);
    }
  }, [deleteProductError]);

  useEffect(() => {
    if (updatePublishError) {
      message.error(updatePublishError);
    }
  }, [updatePublishError]);

  useEffect(() => {
    if (updateAvailableError) {
      message.error(updateAvailableError);
    }
  }, [updateAvailableError]);

  useEffect(() => {
    if (updateProductError) {
      message.error(updateProductError);
    }
  }, [updateProductError]);

  useEffect(() => {
    if (createProductError) {
      setWaiting(false);
      setForm({
        ...form,
        formdata: {
          ...form.formdata,
          name: {
            ...form.formdata.name,
            valid: false,
            validationMessage: 'Tên sản phẩm đã tồn tại',
          },
        },
      });
    }
  }, [createProductError]);

  useEffect(() => {
    if (products) {
      setLoading(false);
      setWaiting(false);
      setEdit({ active: false, status: 'none' });
    }
  }, [products]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={50} thickness={4} />
      </div>
    );
  } else if (edit.active) {
    return (
      <div className={styles.formContainer}>
        <form>
          <div className={styles.title} onSubmit={(event) => submitForm(event)}>
            {edit.status === 'create' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}
          </div>
          <FormField id={'name'} formdata={form.formdata.name} change={(e: any) => updateForm(e)} />
          <FormField id={'price'} formdata={form.formdata.price} change={(e: any) => updateForm(e)} />
          <FormField id={'image'} formdata={form.formdata.image} change={(e: any) => updateForm(e)} />
          <FormField id={'salePrice'} formdata={form.formdata.salePrice} change={(e: any) => updateForm(e)} />
          {form.formError && <div className={styles.errorLabel}>{form.formMessage}</div>}
          {isWaiting && (
            <div className={styles.waiting}>
              <CircularProgress color="secondary" />
            </div>
          )}
          <div className={styles.buttonWrapper}>
            <Button variant="contained" color="primary" className={styles.button} onClick={(event) => exitForm(event)}>
              Hủy
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={styles.button}
              onClick={(event) => submitForm(event)}
              type="submit"
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.topWrapper}>
          <TopAdminTable handleCreate={handleCreatePost} />
        </div>
        <div className={styles.tableWrapper}>
          <Table columns={columns} dataSource={products} rowKey={(record) => record._id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  products: state.products.productsByAdmin,
  getProductsError: state.products.getProductsByAdminError,
  createProductError: state.products.createProductError,
  deleteProductError: state.products.deleteProductError,
  updatePublishError: state.products.updatePublishProductError,
  updateProductError: state.products.updateProductError,
  updateAvailableError: state.products.updateAvailableProductError,
});

export default connect(mapStateToProps, {
  getProductsByAdmin,
  createProduct,
  deleteProduct,
  updatePublish,
  updateProduct,
  updateAvailable,
})(AdminProducts);

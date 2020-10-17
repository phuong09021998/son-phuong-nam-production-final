interface FormElement {
  element: string;
  value: string;
  config?: {
    name?: string;
    type?: string;
    placeholder?: string;
    label?: string;
  };
  validation: {
    required?: boolean;
    email?: boolean;
    password?: boolean;
    confirm?: string;
  };
  valid: boolean;
  touched?: boolean;
  validationMessage?: string;
  showlabel?: boolean;
}

interface Formdata {
  [name: string]: FormElement;
}

export const validate = (element: FormElement, formdata: Formdata) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Email không hợp lệ' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Mật khẩu nhập lại không chính xác' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.password) {
    const valid = element.value.length >= 6;
    const message = `${!valid ? 'Mật khẩu phải lớn hơn 6 kí tự' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    let valid;
    if (element.element !== 'image') {
      valid = element.value.trim() !== '';
    } else {
      valid = element.value !== '';
    }
    const message = `${!valid ? 'Bạn phải nhập mục này' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

// @ts-ignore
export const update = (element: any, formdata: Formdata, formName: string) => {
  const newFormdata: Formdata = {
    ...formdata,
  };
  const newElement: FormElement = {
    ...newFormdata[element.id],
  };

  if (element.id === 'content') {
    newElement.value = element.event;
  } else if (element.id === 'image') {
    newElement.value = element.event.target.files[0];
  } else {
    newElement.value = element.event.target.value;
  }

  if (element.blur || element.id === 'image' || element.id === 'content' || element.id === 'password') {
    const validData = validate(newElement, formdata);
    newElement.valid = validData[0] as boolean;
    newElement.validationMessage = validData[1] as string;
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
};

// @ts-ignore
export const generateData = (formdata: Formdata, formName: string) => {
  const dataToSubmit: any = {};

  const setType = (name: string) => {
    if (name === 'Dự án') {
      return 'project';
    } else if (name === 'Dịch vụ') {
      return 'service';
    } else {
      return 'info';
    }
  };

  for (const key in formdata) {
    if (key === 'role') {
      dataToSubmit[key] = formdata[key].value === 'Quản trị viên' ? 1 : 0;
    } else if (key === 'type') {
      dataToSubmit[key] = setType(formdata[key].value);
    } else if (key === 'image') {
      if (typeof formdata[key].value === 'object') {
        dataToSubmit[key] = formdata[key].value;
      }
    } else if (key !== 'confirmPassword') {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};

// @ts-ignore
export const isFormValid = (formdata: Formdata, formName: string) => {
  let formIsValid = true;

  for (const key in formdata) {
    formIsValid = (formdata[key].valid && formIsValid) as boolean;
  }
  return formIsValid;
};

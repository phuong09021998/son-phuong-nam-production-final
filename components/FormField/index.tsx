import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface FormElement {
  element: string;
  value: string;
  config?: any;
  validation: {
    required?: boolean;
    email?: boolean;
    password?: boolean;
    confirm?: string;
    label?: string;
  };
  valid: boolean;
  touched?: boolean;
  validationMessage?: string;
  showlabel?: boolean;
}

interface Change {
  event: any;
  id: string;
  blur?: boolean;
}
interface Props {
  formdata: FormElement;
  id: string;
  change(change: Change): void;
  Prefix?: any;
  press?: any;
}

const Formfield = ({ formdata, change, id, Prefix, press }: Props) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = <span>{formdata.validationMessage}</span>;
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div>
            {formdata.showlabel ? <p>{formdata.config.label}</p> : null}
            {Prefix && <Prefix />}
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
              autoComplete="off"
              onKeyPress={(event) => {
                press ? press(event) : null;
              }}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div className="formBlock">
            {formdata.showlabel ? <p>{formdata.config.label}</p> : null}
            <select
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              {/* <option value="">Select one</option> */}
              {formdata.config.options.map((item: any, i: number) => (
                <option key={i} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      case 'textarea':
        formTemplate = (
          <div className="formBlock">
            {formdata.showlabel ? <div className="label_inputs">{formdata.config.label}</div> : null}
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'image':
        const loadImage = (event: any) => {
          const output = document.getElementById('output');
          // @ts-ignore
          output.src = URL.createObjectURL(event.target.files[0]);
          // @ts-ignore
          output.onload = function () {
            // @ts-ignore
            URL.revokeObjectURL(output.src); // free memory
          };
        };

        formTemplate = (
          <div>
            {formdata.showlabel ? <p>{formdata.config.label}</p> : null}

            <input
              {...formdata.config}
              autoComplete="off"
              accept="image/*"
              type="file"
              onChange={(event) => {
                loadImage(event);
                change({ event, id });
              }}
            />
            {showError()}
            <img id="output" />
            {typeof formdata.value === 'string' && formdata.value !== '' && <img src={formdata.value} />}
          </div>
        );
        break;
      case 'rich_text':
        formTemplate = (
          <div>
            {formdata.showlabel ? <p>{formdata.config.label}</p> : null}

            <Editor
              initialValue={formdata.value}
              init={{
                height: 500,
                menubar: 'insert',
                // images_upload_url: '/api/post/image',
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | image |help',
                // @ts-ignore
                file_picker_callback: function (cb: any, value: any, meta: any) {
                  const input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');

                  /*
                      Note: In modern browsers input[type="file"] is functional without
                      even adding it to the DOM, but that might not be the case in some older
                      or quirky browsers like IE, so you might want to add it to the DOM
                      just in case, and visually hide it. And do not forget do remove it
                      once you do not need it anymore.
                    */

                  input.onchange = function () {
                    // @ts-ignore
                    const file = this.files[0];

                    const reader = new FileReader();
                    reader.onload = function () {
                      /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                      const id = 'blobid' + new Date().getTime();
                      // @ts-ignore
                      const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                      // @ts-ignore
                      const base64 = reader.result.split(',')[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);

                      /* call the callback and populate the Title field with the file name */
                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };

                  input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <>{renderTemplate()}</>;
};

export default Formfield;

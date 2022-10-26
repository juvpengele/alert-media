import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  notification,
  Card,
} from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { axios } from "../../../services/Http";
import { transformFormErrors } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addTheme,
  getSelectedTheme,
  Theme,
  updateTheme,
} from "../../../store/themeSlice";
import { useEffect } from "react";

type FormValues = { label: string };

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Veuillez saisir le libellé"),
});

export function ThemeForm() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    values,
    setErrors,
    handleBlur,
    isSubmitting,
    isValid,
    handleChange,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: { label: "" },
    onSubmit: handleformSubmit,
    validationSchema,
  });
  const selectedTheme = useSelector(getSelectedTheme);

  useEffect(() => {
    setFieldValue("label", selectedTheme?.label);
  }, [selectedTheme]);

  async function handleformSubmit(formValues: FormValues) {
    try {
      if (selectedTheme) {
        await _updateTheme(formValues, selectedTheme);
      } else {
        await _createTheme(formValues);
      }

      resetForm();
      notification.success({
        message: "Bravo",
        description: selectedTheme
          ? "La thématique a été mise à jour avec succès"
          : "La thématique a été créée avec succès",
      });
    } catch (error: any) {
      _handleRequestErrors(error);
    }
  }

  async function _createTheme(formValues: FormValues) {
    const response = await axios.post("/themes", formValues);
    dispatch(addTheme(response.data as Theme));
  }

  async function _updateTheme(formValues: FormValues, theme: Theme | null) {
    if (!theme) {
      return;
    }

    const response = await axios.put(`/themes/${theme.id}`, formValues);
    dispatch(updateTheme(response.data as Theme));
  }

  function _handleRequestErrors(error: any) {
    const formErrors: { [field: string]: string[] } | undefined =
      error?.response?.data?.errors;
    if (formErrors) {
      const errors = transformFormErrors(formErrors);
      setErrors(errors);
    } else {
      notification.error({
        message: "Erreur",
        description: "Il y a eu une erreur lors de la requête",
      });
    }
  }

  const hasError = (key: string) =>
    touched.hasOwnProperty(key) && errors.hasOwnProperty(key);

  return (
    <Card bordered={false} className="criclebox">
      <div>
        <Title level={4} className="mb-0">
          {selectedTheme ? "Modifier une thématique" : "Créer une thématique"}
        </Title>
      </div>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        layout="vertical"
        className="row-col my-10"
      >
        <Form.Item
          className="label"
          label="Libellé"
          name="label"
          help={hasError("label") ? errors.label : null}
          validateStatus={hasError("label") ? "error" : "success"}
          hasFeedback={touched.label}
        >
          <Input
            value={values.label}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={!isValid || isSubmitting}
          >
            {selectedTheme ? "Mettre à jour" : "Créer"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

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
  addZone,
  getSelectedZone,
  Zone,
  updateZone,
} from "../../../store/zonesSlice";
import { useEffect } from "react";

type FormValues = { label: string };

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Veuillez saisir le libellé"),
});

export function ZoneForm() {
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
  const selectedZone = useSelector(getSelectedZone);

  useEffect(() => {
    setFieldValue("label", selectedZone?.label);
  }, [selectedZone]);

  async function handleformSubmit(formValues: FormValues) {
    try {
      if (selectedZone) {
        await _updateZone(formValues, selectedZone);
      } else {
        await _createZone(formValues);
      }

      resetForm();
      notification.success({
        message: "Bravo",
        description: selectedZone
          ? "Le zone a été mis à jour avec succès"
          : "Le zone a été créé avec succès",
      });
    } catch (error: any) {
      _handleRequestErrors(error);
    }
  }

  async function _createZone(formValues: FormValues) {
    const response = await axios.post("/zones", formValues);
    dispatch(addZone(response.data as Zone));
  }

  async function _updateZone(formValues: FormValues, zone: Zone | null) {
    if (!zone) {
      return;
    }

    const response = await axios.put(`/zones/${zone.id}`, formValues);
    dispatch(updateZone(response.data as Zone));
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
          {selectedZone ? "Modifier zone zone" : "Créer une zone"}
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
            {selectedZone ? "Mettre à jour" : "Créer"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

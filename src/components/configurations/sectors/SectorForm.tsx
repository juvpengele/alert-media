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
  addSector,
  getSelectedSector,
  Sector,
  updateSector,
} from "../../../store/sectorsSlice";
import { useEffect } from "react";

type FormValues = { label: string | undefined };

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Veuillez saisir le libellé"),
});

export function SectorForm() {
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
    setValues,
  } = useFormik<FormValues>({
    initialValues: { label: "" },
    onSubmit: handleformSubmit,
    validationSchema,
  });
  const selectedSector = useSelector(getSelectedSector);

  useEffect(() => {
    setValues({ label: selectedSector?.label });
    console.log('hey!')
  }, [selectedSector]);

  async function handleformSubmit(formValues: FormValues) {
    const isUpdate = !! selectedSector;

    try {
      if (selectedSector) {
        await _updateSector(formValues, selectedSector);
      } else {
        await _createSector(formValues);
      }

      notification.success({
        message: "Bravo",
        description: isUpdate
          ? "Le secteur a été mis à jour avec succès"
          : "Le secteur a été créé avec succès",
      });
      resetForm();
      setValues({ label:'' })
    } catch (error: any) {
      _handleRequestErrors(error);
    }
  }

  async function _createSector(formValues: FormValues) {
    const response = await axios.post("/sectors", formValues);
    dispatch(addSector(response.data as Sector));
  }

  async function _updateSector(formValues: FormValues, sector: Sector | null) {
    if (!sector) {
      return;
    }

    const response = await axios.put(`/sectors/${sector.id}`, formValues);
    dispatch(updateSector(response.data as Sector));
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

  const hasError = (key: string) => touched.hasOwnProperty(key) && errors.hasOwnProperty(key);

  return (
    <Card bordered={false} className="criclebox">
      <div>
        <Title level={4} className="mb-0">
          {selectedSector ? "Modifier un secteur" : "Créer un secteur"}
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
            name="label"
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
            {selectedSector ? "Mettre à jour" : "Créer"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}


import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";
import logo from '../assets/logo-embleme.png';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { axios } from "../services/Http";
import { transformFormErrors } from "../utils/helpers";
import { authSelector, login, User } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type FormValues = {
  email: string,
  password: string
}

const { Title, Text } = Typography;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez saisir votre email").email("Veuillez saisir un email valide"),
  password: Yup.string().required("Veuillez saisir votre mot de passe"),
});

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelector);

  useEffect(() => {
    if(auth) {
      navigate('/dashboard');
    }
  }, [auth]);

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
  } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: loginUser,
    validationSchema,
  });

  async function loginUser(formValues: FormValues) {
    try {
      const response = await axios.post('/auth/login', formValues);

      dispatch(login(response.data.data as User));

    } catch(error: any) {
      _handleRequestErrors(error);
    }
  }

  function _handleRequestErrors(error:any) {
    const formErrors: {[field:string]: string[]} | undefined = error?.response?.data?.errors;
    if(formErrors) {
      const errors = transformFormErrors(formErrors);
      setErrors(errors);
    } else {
      notification.error({
        message: 'Erreur',
        description: 'Il y a eu une erreur lors de la requête'
      })
    }
  }

  const hasError = (key: string) => touched.hasOwnProperty(key) && errors.hasOwnProperty(key);

  return (
    <Row gutter={[24, 0]} justify="space-around">
      <Col
        xs={{ span: 24, offset: 0 }}
        lg={{ span: 6 }}
        md={{ span: 12 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src={logo} alt="" width={100} />
          <Title level={1} className="mb-0">Connexion</Title>
          <Text type="secondary">Veuillez saisir votre email et votre mot de passe pour vous connecter</Text>
        </div>
      
          <Form
            onFinish={handleSubmit}
            onFinishFailed={() => {}}
            layout="vertical"
            className="row-col my-10"
          >
            <Form.Item
              className="email"
              label="Email"
              name="email"
              help={hasError("email") ? errors.email : null}
              validateStatus={hasError("email") ? "error" : "success"}
              hasFeedback={touched.password}
            >
              <Input placeholder="Email" value={values.email} onChange={handleChange}  onBlur={handleBlur} />
            </Form.Item>

            <Form.Item
              className="Password"
              label="Mot de passe"
              name="password"
              help={hasError("password") ? errors.password : null}
              validateStatus={hasError("password") ? "error" : "success"}
              hasFeedback={touched.password}
            >
              <Input.Password placeholder="********" value={values.password} onChange={handleChange}  onBlur={handleBlur} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" style={{ width: "100%" }}
                disabled={! isValid || isSubmitting}
              >
                CONNEXION
              </Button>
            </Form.Item>

          </Form>
      </Col>
      
    </Row>
  );
}

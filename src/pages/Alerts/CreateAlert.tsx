import { Card, Steps, Row, Col, Form, Typography, Input, DatePicker, Select, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../services/Http';
import { addSectors, getSectors, Sector } from '../../store/sectorsSlice';
import { addThemes, getThemes, Theme } from '../../store/themeSlice';
import { addZones, getZones, Zone } from '../../store/zonesSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { DatePickerProps } from 'antd';
import { transformFormErrors } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Le titre est obligatoire'),
  summary: Yup.string().required('Le résumé est obligatoire'),
  link: Yup.string().required('Veuillez saisir le lien de l\'alerte'),
  explanation: Yup.string().required('L\'explication est obligatoire'),
  date: Yup.string().required('Le date est obligatoire'),
});

interface AlertFormValues {
  title: string,
  media_action?: string,
  principal_action?: string,
  summary: string,
  link: string,
  explanation: string,
  date: Date,
  zones: number[],
  sectors: number[], 
  themes: number[]
}

export const CreateAlert: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    values,
    setFieldValue,
    setErrors,
    handleBlur,
    isSubmitting,
    isValid,
    handleChange,
    errors,
    touched,
    resetForm,
    setValues,
  } = useFormik<AlertFormValues>({
    initialValues: { title: '', summary: '', link: '', explanation: '', date: new Date(), zones: [], sectors: [], themes: [] },
    onSubmit: handleFormSubmit,
    validationSchema,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSectors() {
      try {
        const response = await axios.get('sectors');
        dispatch(addSectors(response.data as Sector[]));
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchZones() {
      try {
        const response = await axios.get('zones');
        dispatch(addZones(response.data as Zone[]));
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchThemes() {
      try {
        const response = await axios.get('themes');
        dispatch(addThemes(response.data as Theme[]));
      } catch (error) {
        console.log(error);
      }
    }

    fetchSectors();
    fetchZones();
    fetchThemes();
  }, []);


  const zones = useSelector(getZones);
  const sectors = useSelector(getSectors);
  const themes = useSelector(getThemes);

  async function handleFormSubmit(formValues: AlertFormValues) {
    try {
      await axios.post('/alerts', formValues);

      notification.success({
        message: 'Bravo',
        description: "L'alerte a été créée avec succès"
      });

      navigate('/alerts');

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
    <Form layout="vertical" onFinish={handleSubmit}>
      <Card style={{ padding: "2rem"}}>
        <Row gutter={30}>
          <Col span={8}>
            <Title level={3}>Résumé</Title>
            <Form.Item
              label="Titre de l'alerte"
              name="title"
              help={hasError("title") ? errors.title : null}
              validateStatus={hasError("title") ? "error" : "success"}
              hasFeedback={touched.title}
            >
              <Input 
                placeholder="..."   
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Résumé de l'alerte"
              name="summary"
              help={hasError("summary") ? errors.summary : null}
              validateStatus={hasError("summary") ? "error" : "success"}
              hasFeedback={touched.summary}
            >
              <Input.TextArea 
                placeholder="..."  
                style={{ height: 150 }}  
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Lien"
              name="link"
              help={hasError("link") ? errors.link : null}
              validateStatus={hasError("link") ? "error" : "success"}
              hasFeedback={touched.link}
            >
              <Input 
                placeholder="https://..." 
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Date l'alerte"
              name="date"
              validateStatus={hasError("date") ? "error" : "success"}
            >
              <DatePicker
                placeholder="..."  
                style={{ width: '100%' }}
                name="date"
                onChange={(_, dateString) => setFieldValue('date', dateString)}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Title level={3}>Détails</Title>

            <Form.Item
              label="Zones"
              name="zones"
            >
              <Select
                mode="tags"
                placeholder="Selectionner la ou les zones de l'alerte"
                value={values.zones}
                onChange={(value) => setFieldValue('zones', value)}
                style={{ width: '100%' }}
              >
                {zones.map((zone) => (
                  <Select.Option key={zone.id}>
                    { zone.label }
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Thématiques"
              name="themes"
            >
              <Select
                mode="tags"
                placeholder="Selectionner la ou les themes de l'alerte"
                onChange={(value) => setFieldValue('themes', value)}
                style={{ width: '100%' }}
              >
                {themes.map((theme) => (
                  <Select.Option key={theme.id}>
                    { theme.label }
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Secteurs"
              name="sectors"
            >
              <Select
                mode="tags"
                placeholder="Selectionner la ou les secteurs de l'alerte"
                onChange={(value) => setFieldValue('sectors', value)}
                style={{ width: '100%' }}
              >
                {sectors.map((sector) => (
                  <Select.Option key={sector.id}>
                    { sector.label }
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              className="email"
              label="Explication"
              name="explanation"
              help={hasError("explanation") ? errors.explanation : null}
              validateStatus={hasError("explanation") ? "error" : "success"}
              hasFeedback={touched.explanation}
            >
              <Input.TextArea 
                showCount 
                placeholder="..."  
                style={{ height: 150 }} 
                value={values.explanation}
                onChange={handleChange}
                onBlur={handleBlur} 
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Title  level={3}>Suivi</Title>
            <Form.Item
              label="Action"
              name="action"
              help={hasError("principal_action") ? errors.principal_action : null}
              validateStatus={hasError("principal_action") ? "error" : "success"}
              hasFeedback={touched.principal_action}
            >
              <Input.TextArea 
                showCount 
                placeholder="..."  
                style={{ height: 150 }}  
                value={values.principal_action}
                onChange={handleChange}
                onBlur={handleBlur} 
              />
            </Form.Item>
            <Form.Item
              label="Action Media"
              name="media_action"
              help={hasError("media_action") ? errors.media_action : null}
              validateStatus={hasError("media_action") ? "error" : "success"}
              hasFeedback={touched.media_action}
            >
              <Input.TextArea 
                showCount 
                placeholder="..."  
                style={{ height: 150 }}  
                value={values.media_action}
                onChange={handleChange}
                onBlur={handleBlur} 
              />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item>
                <Button type="primary" htmlType="submit"
                  disabled={! isValid || isSubmitting}
                >
                  ENREGISTRER
                </Button>
              </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

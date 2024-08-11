import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/grades/gradesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditGradesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    grade: '',

    student: '',

    assignment: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { grades } = useAppSelector((state) => state.grades);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof grades === 'object') {
      setInitialValues(grades);
    }
  }, [grades]);

  useEffect(() => {
    if (typeof grades === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = grades[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [grades]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/grades/grades-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit grades')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit grades'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Grade'>
                <Field type='number' name='grade' placeholder='Grade' />
              </FormField>

              <FormField label='Student' labelFor='student'>
                <Field
                  name='student'
                  id='student'
                  component={SelectField}
                  options={initialValues.student}
                  itemRef={'students'}
                  showField={'first_name'}
                ></Field>
              </FormField>

              <FormField label='Assignment' labelFor='assignment'>
                <Field
                  name='assignment'
                  id='assignment'
                  component={SelectField}
                  options={initialValues.assignment}
                  itemRef={'assignments'}
                  showField={'title'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/grades/grades-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditGradesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_GRADES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditGradesPage;

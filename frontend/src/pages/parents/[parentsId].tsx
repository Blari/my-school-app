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

import { update, fetch } from '../../stores/parents/parentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditParents = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    first_name: '',

    last_name: '',

    user: '',

    children: [],

    animal: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { parents } = useAppSelector((state) => state.parents);

  const { parentsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: parentsId }));
  }, [parentsId]);

  useEffect(() => {
    if (typeof parents === 'object') {
      setInitialValues(parents);
    }
  }, [parents]);

  useEffect(() => {
    if (typeof parents === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = parents[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [parents]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: parentsId, data }));
    await router.push('/parents/parents-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit parents')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit parents'}
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
              <FormField label='FirstName'>
                <Field name='first_name' placeholder='FirstName' />
              </FormField>

              <FormField label='LastName'>
                <Field name='last_name' placeholder='LastName' />
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Children' labelFor='children'>
                <Field
                  name='children'
                  id='children'
                  component={SelectFieldMany}
                  options={initialValues.children}
                  itemRef={'students'}
                  showField={'first_name'}
                ></Field>
              </FormField>

              <FormField label='Animal'>
                <Field name='animal' placeholder='Animal' />
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
                  onClick={() => router.push('/parents/parents-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditParents.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PARENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditParents;

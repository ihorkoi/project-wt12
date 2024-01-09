import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal/';

import {
  ModalWrapper,
  ModalHeader,
  CloseBtn,
  FormulasWrapper,
  Gender,
  Formula,
  HighlightedAsterisk,
  FormulasDescription,
  StyledForm,
  FormTitle,
  CalculatesWrapper,
  RequiredAmount,
  CalculatedAmount,
  SaveBtnWrapper,
  CloseIcon,
} from './MyDailyNormaModal.styled';

import { updateUserInfo } from '../../redux/user/userSlice';
import { useContext } from 'react';
import { ModalContext } from 'components/common/ModalProvider/ModalProvider';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  gender: Yup.string().required('Required'),
  weight: Yup.number()
    .required('Required')
    .min(0, 'Weight must be a positive number'),
  activityTime: Yup.number()
    .required('Required')
    .min(0, 'Activity time must be a positive number'),
  drunkWaterAmount: Yup.number().required('Required'),
});

const MyDailyNormaModal = () => {
  const dispatch = useDispatch();
  const toggleModal = useContext(ModalContext);
  const userGender = useSelector(state => state.user.gender);

  const [WaterAmount, setWaterAmount] = useState(0);

  const calculateWaterAmount = useCallback(values => {
    const time = values.gender === 'female' ? 0.4 : 0.6;
    const weight = values.gender === 'female' ? 0.03 : 0.04;

    const calculatedAmount =
      values.weight * weight + values.activityTime * time;
    setWaterAmount(calculatedAmount.toFixed(2));
  }, []);

  const handleSubmit = async () => {
    dispatch(updateUserInfo(formik.values.drunkWaterAmount));
    formik.resetForm();

    toggleModal();
  };

  const handleInputChange = (e, fieldName) => {
    formik.handleChange(e);
    const inputText = e.target.value;
    let numericValue = parseFloat(inputText);
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    formik.setFieldValue(fieldName, numericValue);
  };

  const formik = useFormik({
    initialValues: {
      gender: userGender,
      weight: 0,
      activityTime: 0,
      drunkWaterAmount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    calculateWaterAmount(formik.values);
  }, [calculateWaterAmount, formik.values]);

  const onClickModalClose = () => {
    toggleModal();
  };

  return (
    <Modal onClose={toggleModal}>
      <ModalWrapper>
        <>
          <ModalHeader>
            My daily norma
            <CloseBtn onClick={onClickModalClose}>
              <CloseIcon />
            </CloseBtn>
          </ModalHeader>

          <FormulasWrapper>
            <Gender>
              For girl:
              <Formula> V=(M*0.03) + (T*0.4)</Formula>
            </Gender>
            <Gender>
              For man:
              <Formula> V=(M*0.04) + (T*0.6)</Formula>
            </Gender>
          </FormulasWrapper>

          <FormulasDescription>
            {' '}
            <HighlightedAsterisk>*</HighlightedAsterisk> V is the volume of the
            water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms
            of loads (in the absence of these, you must set 0)
          </FormulasDescription>

          <StyledForm>
            <FormTitle>Calculate your rate:</FormTitle>

            <CalculatesWrapper>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={formik.values.gender === 'female'}
                  onChange={() => formik.setFieldValue('gender', 'female')}
                />
                For girl
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={formik.values.gender === 'male'}
                  onChange={() => formik.setFieldValue('gender', 'male')}
                />
                For man
              </label>
            </CalculatesWrapper>

            <Input
              label="Your weight in kilograms:"
              value={formik.values.weight}
              onChange={e => handleInputChange(e, 'weight')}
              onBlur={formik.handleBlur}
              name="weight"
              error={formik.touched.weight && formik.errors.weight}
            />

            <Input
              label="The time of active participation in sports or other
                activities with a high physical load:"
              value={formik.values.activityTime}
              onChange={e => handleInputChange(e, 'activityTime')}
              onBlur={formik.handleBlur}
              name="activityTime"
              error={formik.touched.activityTime && formik.errors.activityTime}
            />

            <RequiredAmount>
              <>The required amount of water in liters per day:</>
              <CalculatedAmount>
                {isNaN(WaterAmount) ? 'Invalid' : `${WaterAmount} L`}
              </CalculatedAmount>
            </RequiredAmount>

            <Input
              label={
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    lineHeight: '111.1%',
                  }}
                >
                  Write down how much water you will drink:
                </span>
              }
              value={formik.values.drunkWaterAmount}
              onChange={e => handleInputChange(e, 'drunkWaterAmount')}
              onBlur={formik.handleBlur}
              name="drunkWaterAmount"
              error={
                formik.touched.drunkWaterAmount &&
                formik.errors.drunkWaterAmount
              }
            />

            <SaveBtnWrapper>
              <Button type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </SaveBtnWrapper>
          </StyledForm>
        </>
      </ModalWrapper>
    </Modal>
  );
};

export default MyDailyNormaModal;

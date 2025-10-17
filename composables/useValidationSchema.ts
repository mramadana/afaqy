import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';

export const useValidationSchema = () => {

  const { t } = useI18n();

    setLocale({
      mixed: {
        required: ({ label }) => t('validation.required_with_label', { field: label }),
      },
      string: {
        min: ({ label, min }) => t('validation.min', { field: label, min }),
        max: ({ label, max }) => t('validation.max', { field: label, max }),
      },
    });

  // required

  const required = (labelKey: string) =>
    yup
      .string()
      .required(t('validation.required_with_label', { field: t(labelKey) }));

  const phoneNumber = (label: string) =>
    yup
      .string()
      .trim()
      .required(t('validation.required_with_label', { field: label }))
      .matches(/^[1-9][0-9]*$/, t('validation.phone_only_digits_no_zero_at_start'))
      .min(9, t('validation.minNum', { field: label, min: 9 }))
      .max(10, t('validation.maxNum', { field: label, max: 10 }))
      .label(label);


    // OTP Schema 4 numbers
    const otpCode = yup
    .string()
    .required(t('validation.otp_required'))
    .matches(/^\d{4}$/, t('validation.otp_must_be_4_digits'));

    // last name
    const lastname = (label: string) =>
      yup
        .string()
        .trim()
        .required(t('validation.required_with_label', { field: label }))
        .min(3, label + " " + t('validation.min', { field: label, min: 3 }))
        .max(10, label + " " + t('validation.max', { field: label, max: 10 }))
    

    // Full Name Schema

    const fullName = (label: string) =>
      yup
        .string()
        .trim()
        .required(t('validation.required_with_label', { field: label }))
        .min(3, label + " " + t('validation.min', { field: label, min: 3 }))
        .max(50, label + " " + t('validation.max', { field: label, max: 50 }))
        .label(label);

    // Email Schema 
    const email = (label: string) =>
      yup
        .string()
        .trim()
        .required(t('validation.required_with_label', { field: label }))
        .matches(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/, t('validation.email', { field: label }))
        .email(t('validation.email', { field: label }));

    // iban Schema
    const iban = (label: string) =>
      yup
        .string()
        .trim()
        .required(t('validation.required_with_label', { field: label }))
        .matches(/^[0-9]+$/, t('validation.iban_only_digits'))
        .min(14, label + " " + t('validation.min', { field: label, min: 14 }))
        .max(29, label + " " + t('validation.max', { field: label, max: 29 }))
        .label(label);

    // Select Gender Schema
    const gender = yup
    .object()
    .required(t('validation.required'))
    .label(t('auth.gender'));

    // Checkbox Schema (for terms and conditions, agreements, etc.)
    const checkbox = (labelKey: string) =>
      yup
        .boolean()
        .required(t('validation.required_with_label', { field: t(labelKey) }))
        .oneOf([true], t('validation.required_with_label', { field: t(labelKey) }))
        .label(t(labelKey));

    // Radio Button Schema (for gender, preferences, etc.)
    const radioButton = (labelKey: string) =>
      yup
        .string()
        .required(t('validation.required_with_label', { field: t(labelKey) }))
        .label(t(labelKey));

    // Multiple Checkboxes Schema (for interests, skills, etc.)
    const multipleCheckboxes = (labelKey: string, minRequired: number = 1) =>
      yup
        .array()
        .min(minRequired, t('validation.select_at_least', { field: t(labelKey), min: minRequired }))
        .required(t('validation.required_with_label', { field: t(labelKey) }))
        .label(t(labelKey));

  
  return {
    required,
    phoneNumber,
    otpCode,
    fullName,
    email,
    gender,
    lastname,
    iban,
    checkbox,
    radioButton,
    multipleCheckboxes
  }
}
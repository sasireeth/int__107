import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import { FormContainer, FormTitle, InputGroup, StyledLabel, StyledField, StyledSelect, StyledErrorMessage, StyledButton, FileInputLabel, HiddenFileInput } from './SignupForm.style';

const SignUpForm = ({ onSubmitSuccess }) => {
  const [fileName, setFileName] = useState('');
  const [isSubmitting,setSubmitting] = useState(false)
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, setValue,clearErrors } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      console.log('Form submitted with values:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmitSuccess();
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Create Your Account</FormTitle>

        <InputGroup>
          <StyledLabel htmlFor="name">Full Name</StyledLabel>
          <StyledField {...register('name')} id="name" placeholder="Enter your full name" />
          <StyledErrorMessage>{errors.name?.message}</StyledErrorMessage>
        </InputGroup>

        <InputGroup>
          <StyledLabel htmlFor="email">Email Address</StyledLabel>
          <StyledField {...register('email')} id="email" type="email" placeholder="Enter your email" />
          <StyledErrorMessage>{errors.email?.message}</StyledErrorMessage>
        </InputGroup>

        <InputGroup>
          <StyledLabel htmlFor="mobile">Mobile Number</StyledLabel>
          <StyledField {...register('mobile')} id="mobile" placeholder="Enter your mobile number" />
          <StyledErrorMessage>{errors.mobile?.message}</StyledErrorMessage>
        </InputGroup>

        <InputGroup>
          <StyledLabel htmlFor="occupation">Occupation</StyledLabel>
          <StyledSelect {...register('occupation')} id="occupation">
            <option value="">Select your occupation</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="influencer">Social Media Influencer</option>
            <option value="agent">Marketing Agent</option>
            <option value="placement">Placement Officer</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </StyledSelect>
          <StyledErrorMessage>{errors.occupation?.message}</StyledErrorMessage>
        </InputGroup>

        <InputGroup>
          <StyledLabel htmlFor="document">Upload Document</StyledLabel>
          <FileInputLabel>
            {fileName || 'Choose a file'}
            <HiddenFileInput
              {...register('document')}
              id="document"
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setFileName(file.name);
                  setValue('document', file);
                  clearErrors('document');
                }
              }}
            />
          </FileInputLabel>
          <StyledErrorMessage>{errors.document?.message}</StyledErrorMessage>
        </InputGroup>

        {error && <StyledErrorMessage>{error}</StyledErrorMessage>}

        <StyledButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </StyledButton>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

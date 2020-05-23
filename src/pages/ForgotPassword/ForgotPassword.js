import React from 'react';
import { useObserver } from 'mobx-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStore } from '../../store';
import { FormTextField } from '../../components/Form';

import { useStyles } from './ForgotPassword.styles';

const initialValues = {
  email: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export default props => {
  const { navigate } = props;
  const { store, store: { user } } = useStore();
  const classes = useStyles();

  const forgotPassword = async ({ email }, actions) => {
    await user.forgotPassword(email);
    if (!store.error) {
      await navigate('/app/resetpassword', { replace: true });
    }
  };

  const signIn = async event => {
    event.preventDefault();
    await navigate('/app/signin');
  };

  return useObserver(() => (
    <main className={classes.main}>
      <div className={classes.pageTitle}>
        <LocationCityIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
      </div>
      <Paper className={classes.forgotPasswordPaper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={forgotPassword}
        >
          {({ isValid }) => {
            return (
              <Form className={classes.form}>
                <FormTextField
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <div className={classes.formActions}>
                  <Button
                    variant="contained"
                    onClick={signIn}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                  >
                    Send reset password email
                  </Button>
                </div>

              </Form>
            )
          }}
        </Formik>
      </Paper>
    </main>
  ));
};
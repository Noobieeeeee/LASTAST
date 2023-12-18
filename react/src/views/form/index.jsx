import { Box, Button, TextField, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useDropzone } from "react-dropzone";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNotification } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    status: "",
    contact: "",
    address1: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onDrop = (acceptedFiles) => {
    // Handle dropped files (acceptedFiles)
    console.log(acceptedFiles);
    // You can set the selected image file to the form values or perform other actions here
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Specify accepted file types (images in this case)
    multiple: false, // Allow only a single file to be dropped
  });

  const onSubmit = (values) => {
    const { password, password_confirmation, ...rest } = values;

    if (password === password_confirmation) {
      const updatedUser = {
        ...user,
        ...rest,
        password: password,
      };

      if (user.id) {
        axiosClient
          .put(`/users/${user.id}`, updatedUser)
          .then(() => {
            setNotification("User was successfully updated");
            navigate("/users");
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          });
      } else {
        axiosClient
          .post("/users", updatedUser)
          .then(() => {
            setNotification("User was successfully created");
            navigate("/users");
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          });
      }
    } else {
      // Handle password mismatch error
      setErrors({ password_confirmation: ["Passwords do not match"] });
    }
  };

  const goBackToProfiles = () => {
    navigate("/form");
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    status: yup.string().required("required"),
    address1: yup.string().required("address is required"),
    contact: yup.string().required("contact number is required"),
  });

  return (
    <Box m="20px">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          name: user.name || "",
          email: user.email || "",
          password: "",
          password_confirmation: "",
          status: user.status || "",
          address1: "", 
          contact: "",
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
              >
                <div>
                  {id ? (
                    <Header title={`Update User: ${user.name}`} />
                  ) : (
                    <Header title="New User" subtitle="Create a New User Profile" />
                  )}
                </div>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    padding: "30px",
                    textAlign: "center",
                    width: "150px",
                    height: "150px",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>Click or drag to select an image</p>
                </div>
              </Box>

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(5, minmax(0, 1fr))"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password Confirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password_confirmation}
                  name="password_confirmation"
                  error={!!touched.password_confirmation && !!errors.password_confirmation}
                  helperText={touched.password_confirmation && errors.password_confirmation}
                  sx={{ gridColumn: "span 2" }}
                />

                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel htmlFor="status" shrink>Status</InputLabel>
                  <Select
                    fullWidth
                    native
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{
                      name: 'status',
                      id: 'status',
                    }}
                    error={!!touched.status && !!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Establishment">Establishment</option>
                  </Select>
                  {touched.status && errors.status && (
                    <FormHelperText error>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" paddingRight="10px">
              <Button onClick={goBackToProfiles} variant="outlined" style={{ marginRight: '10px', borderRadius: "5px", backgroundColor: "green", color: "white" }}>
                Back to Profiles
              </Button>
              <Button type="submit" color="secondary" variant="contained" style={{ borderRadius: "5px", backgroundColor: "green" }}>
                {id ? "Update User" : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;

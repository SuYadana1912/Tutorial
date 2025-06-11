"use client";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";

import { schema } from "./ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      township: "",
    },
  });

  const onSubmit = (FormData) => {
    console.log("FormData", FormData);
    console.log("Name Input Data", FormData.name);
    reset();
  };

  return (
    <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        sx={{ mb: 2 }}
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Phone Number"
        fullWidth
        sx={{ mb: 2 }}
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        label="Address"
        fullWidth
        sx={{ mb: 2 }}
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address?.message}
      />

      <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.city}>
        <InputLabel id="city-label">City</InputLabel>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select {...field} labelId="city-label" label="City">
              <MenuItem value="Yangon">Yangon</MenuItem>
              <MenuItem value="Mandalay">Mandalay</MenuItem>
              <MenuItem value="Naypyidaw">Naypyidaw</MenuItem>
              <MenuItem value="Taunggyi">Taunggyi</MenuItem>
            </Select>
          )}
        />
        <FormHelperText>{errors.city?.message}</FormHelperText>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.township}>
        <InputLabel id="township-label">Township</InputLabel>
        <Controller
          name="township"
          control={control}
          render={({ field }) => (
            <Select {...field} labelId="township-label" label="Township">
              <MenuItem value="Sanchaung">Sanchaung</MenuItem>
              <MenuItem value="Kamayut">Kamayut</MenuItem>
              <MenuItem value="Hlaing">Hlaing</MenuItem>
              <MenuItem value="Insein">Insein</MenuItem>
            </Select>
          )}
        />
        <FormHelperText>{errors.township?.message}</FormHelperText>
      </FormControl>

      <Button variant="contained" type="submit">
        Save
      </Button>
    </Box>
  );
}

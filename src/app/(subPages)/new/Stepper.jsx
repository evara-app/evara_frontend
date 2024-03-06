import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Select catrgory and city",
  "Select property images",
  "Complete property details",
  "Write note",
];

export default function HorizontalLinearAlternativeLabelStepper({
  activeStep,
}) {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

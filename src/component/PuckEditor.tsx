"use client";

import { Puck } from "@measured/puck";
import type { Config } from "@measured/puck";
import "@measured/puck/puck.css";
import React from "react";
import { Button } from "@mui/material";

// Type definitions for props in custom components
interface TextFieldProps {
  label: string;
  placeholder: string;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
}

interface ImageUploadProps {
  label: string;
}

interface SubmitButtonProps {
  href: string;
  variant: any;
  label: string;
  puck: any;
}

// Define the Puck configuration
export const config: Config = {
  categories: {
    formElements: {
      components: [
        "TextField",
        "RadioGroup",
        "Dropdown",
        "Checkbox",
        "ImageUpload",
        "SubmitButton",
        // "Example",
      ],
    },
    // layout: {
    //   components: [
    //     "Sidebar",
    //     "FormContainer",
    //     "TextField",
    //     "RadioGroup",
    //     "Dropdown",
    //     "Checkbox",
    //     "ImageUpload",
    //     "SubmitButton",
    //   ],
    // },
  },
  components: {
    TextField: {
      fields: {
        label: { type: "text" },
        placeholder: { type: "text" },
      },
      defaultProps: {
        label: "Full Name",
        placeholder: "Enter your full name",
      },
      render: ({ label, placeholder }: TextFieldProps) => (
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>
            {label}
          </label>
          <input
            type="text"
            placeholder={placeholder}
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#222",
              color: "#000",
            }}
          />
        </div>
      ),
    },
    RadioGroup: {
      fields: {
        Label: {
          type: "text",
        },
        Radio: {
          type: "radio",
          options: [
            { label: "Water", value: "water" },
            { label: "Orange juice", value: "orange-juice" },
          ],
        },
      },
      defaultProps: {
        options: [
          { label: "Water", value: "water" },
          { label: "Orange juice", value: "orange-juice" },
        ],
        selected: "water",
        Label: "Radio Title",
      },
      render: ({ Label, options, selected, onChange }: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label style={{ marginRight: "15px" }}>{Label}</label>
          <div>
            {options?.map((option: any) => (
              <label key={option.value} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="drink"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={(e) => onChange(e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ),
    },
    Dropdown: {
      fields: {
        Label: {
          type: "text",
        },
        Dropdown: {
          type: "select",
          options: [
            { label: "USA", value: "usa" },
            { label: "INDIA", value: "india" },
          ],
        },
      },
      defaultProps: {
        Label: "Dropdown Title",
        options: [
          { label: "USA", value: "usa" },
          { label: "INDIA", value: "india" },
        ],
        selected: "USA",
      },

      render: ({ Label, options, selected }: any) => (
        <div>
          <label style={{ marginRight: "15px" }}>{Label}</label>
          <select
            defaultValue={selected}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              backgroundColor: "#222",
              color: "#fff",
            }}
          >
            {options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ),
    },
    Checkbox: {
      fields: {
        label: { type: "text" },
      },
      defaultProps: {
        label: "I agree to the terms and conditions",
        checked: false,
      },
      render: ({ label, checked }: CheckboxProps) => (
        <label>
          <input type="checkbox" defaultChecked={checked} /> {label}
        </label>
      ),
    },
    ImageUpload: {
      fields: {
        label: { type: "text" },
        file: { type: "text" },
      },
      defaultProps: {
        label: "Upload Profile Picture",
        file: "",
      },
      render: ({ label }: ImageUploadProps) => (
        <div>
          <label style={{ display: "block", fontWeight: "bold" }}>
            {label}
          </label>
          <input type="file" accept="image/*" />
        </div>
      ),
    },
    SubmitButton: {
      label: "Submit",
      fields: {
        label: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "radio",
          options: [
            { label: "outlined", value: "outlined" },
            { label: "contained", value: "contained" },
          ],
        },
      },
      defaultProps: {
        label: "Submit",
        href: "#",
        variant: "contained",
      },
      render: ({ href, variant, label, puck }: SubmitButtonProps) => {
        return (
          <div>
            <Button
              href={puck.isEditing ? "#" : href}
              variant={variant}
              size="large"
              tabIndex={puck.isEditing ? -1 : undefined}
            >
              {label}
            </Button>
          </div>
        );
      },
    },
  },
};

// Initial data for the form
const initialData: Record<string, unknown> = {};

// Function to handle form submission (save data)
const save = (data: Record<string, unknown>) => {
  console.log("Form submitted with data:", data);
};

// Main component
const PuckForm = () => {
  return (
    <>
      <Puck config={config} data={initialData} onPublish={save} />
    </>
  );
};

export default PuckForm;

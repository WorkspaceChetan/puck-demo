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

interface RadioProps {
  Label: string;
  selected: string;
  options: { label: string; value: string }[];
  onChange: (event: string) => void;
}

interface SelectProps {
  Label: string;
  selected: string;
  options: { label: string; value: string }[];
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
        "Checkbox",
        "ImageUpload",
        "SubmitButton",
        "Select",
      ],
    },
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
    Select: {
      fields: {
        Label: {
          type: "text",
        },
        options: {
          type: "array",
          getItemSummary: (item) => item.label || "Add dropdown options",
          defaultItemProps: {
            label: "",
            value: "",
          },
          arrayFields: {
            label: { type: "text" },
            value: { type: "text" },
          },
        },
      },
      defaultProps: {
        Label: "Dropdown Title",
        options: [
          { label: "USA", value: "usa" },
          { label: "INDIA", value: "india" },
        ],
        selected: "usa",
      },
      render: ({ Label, options, selected }: SelectProps) => {
        return (
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
        );
      },
    },
    RadioGroup: {
      fields: {
        Label: {
          type: "text",
        },
        options: {
          type: "array",
          getItemSummary: (item) => item.label || "Add radio",
          defaultItemProps: {
            label: "",
            value: "",
          },
          arrayFields: {
            label: { type: "text" },
            value: { type: "text" },
          },
        },
      },
      defaultProps: {
        options: [
          { label: "Water", value: "water" },
          { label: "Orange juice", value: "orange-juice" },
          { label: "Mango juice", value: "mango-juice" },
        ],
        selected: "water",
        Label: "Radio Title",
      },
      render: ({ Label, options, selected, onChange }: RadioProps) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label style={{ marginRight: "15px" }}>{Label}</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {options?.map((option: any) => (
              <label
                key={option.value}
                style={{ marginRight: "15px", display: "flex", gap: "8px" }}
              >
                <input
                  type="radio"
                  name="drink"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  style={{ padding: "15px" }}
                />
                {option.label}
              </label>
            ))}
          </div>
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
  localStorage.setItem("puck-data", JSON.stringify(data));
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

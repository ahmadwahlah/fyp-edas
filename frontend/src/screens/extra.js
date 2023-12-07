import React, { useState } from "react";

const FormFieldAdder = () => {
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");

  const handleFieldNameChange = (event) => {
    setNewFieldName(event.target.value);
  };

  const handleFieldTypeChange = (event) => {
    setNewFieldType(event.target.value);
  };

  const handleFieldPlaceholderChange = (event) => {
    setNewFieldPlaceholder(event.target.value);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        name: newFieldName,
        type: newFieldType,
        placeholder: newFieldPlaceholder,
      },
    ]);
    setNewFieldName("");
    setNewFieldType("");
    setNewFieldPlaceholder("");
  };

  return (
    <div>
      <h2>Add Fields</h2>
      <div>
        <label htmlFor="fieldName">Field Name:</label>
        <input
          type="text"
          id="fieldName"
          name="fieldName"
          value={newFieldName}
          onChange={handleFieldNameChange}
        />
      </div>
      <div>
        <label htmlFor="fieldType">Field Type:</label>
        <select
          id="fieldType"
          name="fieldType"
          value={newFieldType}
          onChange={handleFieldTypeChange}
        >
          <option value="">Select a field type</option>
          <option value="text">Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="select">Select</option>
          <option value="textarea">Textarea</option>
        </select>
      </div>
      {newFieldType === "text" && (
        <div>
          <label htmlFor="fieldPlaceholder">Placeholder:</label>
          <input
            type="text"
            id="fieldPlaceholder"
            name="fieldPlaceholder"
            value={newFieldPlaceholder}
            onChange={handleFieldPlaceholderChange}
          />
        </div>
      )}
      <button onClick={handleAddField}>Add Field</button>
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`field${index}`}>{field.name}:</label>
            {field.type === "text" && (
              <input
                type="text"
                id={`field${index}`}
                name={`field${index}`}
                placeholder={field.placeholder}
              />
            )}
            {field.type === "checkbox" && (
              <input
                type="checkbox"
                id={`field${index}`}
                name={`field${index}`}
              />
            )}
            {field.type === "radio" && (
              <div>
                <input
                  type="radio"
                  id={`field${index}_option1`}
                  name={`field${index}`}
                  value="option1"
                />
                <label htmlFor={`field${index}_option1`}>Option 1</label>
                <input
                  type="radio"
                  id={`field${index}_option2`}
                  name={`field${index}`}
                  value="option2"
                />
                <label htmlFor={`field${index}_option2`}>Option 2</label>
              </div>
            )}
            {field.type === "select" && (
              <select id={`field${index}`} name={`field${index}`}>
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            )}
            {field.type === "textarea" && (
              <textarea id={`field${index}`} name={`field${index}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormFieldAdder;
